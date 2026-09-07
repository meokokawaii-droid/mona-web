-- Apply after 202609040001_survey.sql. Preserve preliminary 1.0 rows.
begin;
alter table public.survey_respondents alter column age drop not null;
alter table public.survey_respondents alter column overseas_experience drop not null;
alter table public.survey_respondents alter column opposing_info_frequency drop not null;
alter table public.survey_respondents add column age_group text check (age_group in ('18–22岁','23–27岁','28–31岁','32–35岁'));
alter table public.survey_respondents add column current_residence text check (current_residence in ('农村','县城','地级市','省会及以上城市'));
alter table public.survey_respondents add column family_economic_status text check (family_economic_status in ('明显低于周围平均水平','略低于平均水平','大致平均','略高于平均水平','明显高于平均水平'));
alter table public.survey_respondents add column overseas_experience_category text check (overseas_experience_category in ('无','仅短期旅行','曾学习或工作','曾长期生活'));
alter table public.survey_respondents add column information_source text check (information_source in ('短视频平台','社交媒体','新闻媒体','搜索引擎','多个境内外来源','亲友交流','其他'));
alter table public.survey_respondents drop constraint survey_respondents_education_check;
alter table public.survey_respondents add constraint survey_respondents_education_check check (education in ('初中及以下','高中或中专','大专','本科','硕士及以上','高中 / 中专'));
alter table public.survey_respondents drop constraint survey_respondents_upbringing_check;
alter table public.survey_respondents add constraint survey_respondents_upbringing_check check (upbringing in ('农村','县城','地级市','省会及以上城市','省会及以上'));
alter table public.survey_respondents add constraint survey_final_demographics check (survey_version <> '1.0-final' or (age_group is not null and current_residence is not null and family_economic_status is not null and overseas_experience_category is not null and information_source is not null));

alter table public.survey_answers drop constraint survey_answers_check;
alter table public.survey_answers add constraint survey_answer_numeric_range check (answer_numeric between 0 and 1000000000);
create function public.survey_validate_answer() returns trigger language plpgsql security invoker set search_path = '' as $$
declare version text; numeric_question boolean; allowed text[];
begin
 select survey_version into version from public.survey_respondents where id=new.respondent_id;
 if version='1.0-final' then
 allowed := ARRAY['A1','A2','A3','A4','A5','A6','B1','B2','B3','B4','B5','B6','C1','C2','C3','C4','C5','C6','C7','D1','D2','D3','D4','D5','D6','D7','E1','E2','E3','E4','E5','E6','E7','F1','F2','F3','F4','F5','F6','F7','G1','G2','G3','G4','G5','G6','G7','H1','H2','H3','I1','I2','I3','I4','I5'];
 numeric_question := new.question_id in ('H1','H2','H3');
 elsif version='1.0' then
 allowed := ARRAY['A1','A2','A3','A4','B1','B2','B3','B4','B5','C1','C2','C3','C4','C5','D1','D2','D3','D4','E1','E2','E3','E4','E5','E6','F1','F2','F3','F4','G1','G2','G3','G4','H1','H2','I1','I2','I3'];
 numeric_question := new.question_id in ('I1','I2','I3');
 else raise exception 'Unknown questionnaire revision'; end if;
 if not new.question_id = any(allowed) then raise exception 'Unknown question'; end if;
 if numeric_question then
 if new.is_correct is null then raise exception 'CRT correctness required'; end if;
 else
 if new.answer_numeric not between 1 and 7 or new.answer_numeric <> trunc(new.answer_numeric) or new.is_correct is not null then raise exception 'Invalid scale answer'; end if;
 end if;
 return new;
end; $$;
create trigger survey_answer_revision_check before insert or update on public.survey_answers for each row execute function public.survey_validate_answer();
create function public.survey_count_version(p_version text) returns bigint language sql security invoker set search_path = '' as $$
 select count(*) from public.survey_respondents where completed and survey_version=p_version;
$$;
create function public.survey_submit_v1_final(p_session uuid,p_version text,p_demographics jsonb,p_answers jsonb,p_min_duration integer) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare s public.survey_sessions; r public.survey_respondents; duration integer; score integer; expected text[] := ARRAY['A1','A2','A3','A4','A5','A6','B1','B2','B3','B4','B5','B6','C1','C2','C3','C4','C5','C6','C7','D1','D2','D3','D4','D5','D6','D7','E1','E2','E3','E4','E5','E6','E7','F1','F2','F3','F4','F5','F6','F7','G1','G2','G3','G4','G5','G6','G7','H1','H2','H3','I1','I2','I3','I4','I5'];
begin
 select * into s from public.survey_sessions where id = p_session for update;
 if not found then raise exception 'Unknown session'; end if;
 if p_version <> '1.0-final' or s.survey_version <> p_version then raise exception 'Invalid questionnaire revision'; end if;
 select * into r from public.survey_respondents where session_id=p_session;
 if found then return jsonb_build_object('public_id',r.public_id,'total',public.survey_count_version(p_version)); end if;
 if s.started_at < now()-interval '30 days' then raise exception 'Expired session'; end if;
 if jsonb_typeof(p_answers) <> 'array' or jsonb_array_length(p_answers) <> cardinality(expected) or
 (select count(distinct x->>'question_id') from jsonb_array_elements(p_answers) x where x->>'question_id'=any(expected)) <> cardinality(expected) then raise exception 'Incomplete answers'; end if;
 if jsonb_typeof(p_demographics) <> 'object' or (select count(*) from jsonb_object_keys(p_demographics)) <> 8 then raise exception 'Invalid demographics'; end if;
 if p_demographics->>'age_group' is null or not p_demographics->>'age_group' = any(ARRAY['18–22岁','23–27岁','28–31岁','32–35岁']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'gender' is null or not p_demographics->>'gender' = any(ARRAY['男','女','其他','不愿回答']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'education' is null or not p_demographics->>'education' = any(ARRAY['初中及以下','高中或中专','大专','本科','硕士及以上']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'upbringing' is null or not p_demographics->>'upbringing' = any(ARRAY['农村','县城','地级市','省会及以上城市']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'current_residence' is null or not p_demographics->>'current_residence' = any(ARRAY['农村','县城','地级市','省会及以上城市']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'family_economic_status' is null or not p_demographics->>'family_economic_status' = any(ARRAY['明显低于周围平均水平','略低于平均水平','大致平均','略高于平均水平','明显高于平均水平']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'overseas_experience_category' is null or not p_demographics->>'overseas_experience_category' = any(ARRAY['无','仅短期旅行','曾学习或工作','曾长期生活']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'information_source' is null or not p_demographics->>'information_source' = any(ARRAY['短视频平台','社交媒体','新闻媒体','搜索引擎','多个境内外来源','亲友交流','其他']) then raise exception 'Invalid demographic option'; end if;
 duration := greatest(0,floor(extract(epoch from now()-s.started_at)))::integer;
 select count(*) into score from jsonb_array_elements(p_answers) x where (x->>'question_id' in ('H1','H2') and (x->>'answer_numeric')::numeric=5) or (x->>'question_id'='H3' and (x->>'answer_numeric')::numeric=47);
 insert into public.survey_respondents(session_id,created_at,age_group,gender,education,upbringing,current_residence,family_economic_status,overseas_experience_category,information_source,crt_score,duration_seconds,survey_version,minimum_reasonable_duration,possible_low_quality)
 values(p_session,s.started_at,p_demographics->>'age_group',p_demographics->>'gender',p_demographics->>'education',p_demographics->>'upbringing',p_demographics->>'current_residence',p_demographics->>'family_economic_status',p_demographics->>'overseas_experience_category',p_demographics->>'information_source',score,duration,p_version,p_min_duration,duration<p_min_duration) returning * into r;
 insert into public.survey_answers(respondent_id,question_id,answer_numeric,is_correct)
 select r.id,x->>'question_id',(x->>'answer_numeric')::numeric,case when x->>'question_id' in ('H1','H2') then (x->>'answer_numeric')::numeric=5 when x->>'question_id'='H3' then (x->>'answer_numeric')::numeric=47 else null end from jsonb_array_elements(p_answers) x;
 return jsonb_build_object('public_id',r.public_id,'total',public.survey_count_version(p_version));
end; $$;
create function public.survey_summary_v1_final(p_version text) returns jsonb language sql security invoker set search_path = '' as $$
 with r as (select * from public.survey_respondents where survey_version=p_version),
 a as (select a.* from public.survey_answers a join r on r.id=a.respondent_id),
 q as (select question_id,avg(answer_numeric) as mean,count(*) as n from a group by question_id),
 opts as (select question_id,answer_numeric,count(*) as n from a group by question_id,answer_numeric),
 dem as (select v.key,v.value,count(*) as n from r cross join lateral jsonb_each_text(jsonb_build_object('age_group',r.age_group,'gender',r.gender,'education',r.education,'upbringing',r.upbringing,'current_residence',r.current_residence,'family_economic_status',r.family_economic_status,'overseas_experience_category',r.overseas_experience_category,'information_source',r.information_source)) v group by v.key,v.value)
 select jsonb_build_object(
 'total',(select count(*) from r), 'started',(select count(*) from public.survey_sessions where survey_version=p_version),
 'today',(select count(*) from r where completed_at >= (date_trunc('day',now() at time zone 'Asia/Shanghai') at time zone 'Asia/Shanghai')),
 'averageDuration',(select avg(duration_seconds) from r),'averageCRT',(select avg(crt_score) from r),
 'lowQuality',(select count(*) from r where possible_low_quality),
 'questions',coalesce((select jsonb_agg(to_jsonb(q)) from q),'[]'::jsonb),
 'options',coalesce((select jsonb_agg(to_jsonb(opts)) from opts),'[]'::jsonb),
 'demographics',coalesce((select jsonb_agg(to_jsonb(dem)) from dem),'[]'::jsonb)
 );
$$;
revoke all on function public.survey_validate_answer(),public.survey_count_version(text),public.survey_submit_v1_final(uuid,text,jsonb,jsonb,integer),public.survey_summary_v1_final(text) from public,anon,authenticated;
grant execute on function public.survey_validate_answer(),public.survey_count_version(text),public.survey_submit_v1_final(uuid,text,jsonb,jsonb,integer),public.survey_summary_v1_final(text) to service_role;
commit;
