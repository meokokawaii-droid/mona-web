-- Additive V1.1 short questionnaire. Old rows and functions remain intact.
begin;
alter table public.survey_respondents alter column crt_score drop not null;
alter table public.survey_respondents add constraint survey_short_no_crt check (survey_version <> '1.1-short' or (crt_score is null and age_group is not null and information_source is not null));
create or replace function public.survey_validate_answer() returns trigger language plpgsql security invoker set search_path = '' as $$
declare version text; numeric_question boolean; allowed text[];
begin
 select survey_version into version from public.survey_respondents where id=new.respondent_id;
 if version='1.1-short' then
 allowed := ARRAY['A1','A2','A3','B1','B2','C1','C2','C3','D1','D2','D3','E1','E2','E3','F1','F2','G1','G2'];
 numeric_question := false;
 elsif version='1.0-final' then
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
create function public.survey_submit_v1_short(p_session uuid,p_version text,p_demographics jsonb,p_answers jsonb,p_min_duration integer) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare s public.survey_sessions; r public.survey_respondents; duration integer; score integer; expected text[] := ARRAY['A1','A2','A3','B1','B2','C1','C2','C3','D1','D2','D3','E1','E2','E3','F1','F2','G1','G2'];
begin
 select * into s from public.survey_sessions where id = p_session for update;
 if not found then raise exception 'Unknown session'; end if;
 if p_version <> '1.1-short' or s.survey_version <> p_version then raise exception 'Invalid questionnaire revision'; end if;
 select * into r from public.survey_respondents where session_id=p_session;
 if found then return jsonb_build_object('public_id',r.public_id,'total',public.survey_count_version(p_version)); end if;
 if s.started_at < now()-interval '30 days' then raise exception 'Expired session'; end if;
 if jsonb_typeof(p_answers) <> 'array' or jsonb_array_length(p_answers) <> cardinality(expected) or
 (select count(distinct x->>'question_id') from jsonb_array_elements(p_answers) x where x->>'question_id'=any(expected)) <> cardinality(expected) then raise exception 'Incomplete answers'; end if;
 if jsonb_typeof(p_demographics) <> 'object' or (select count(*) from jsonb_object_keys(p_demographics)) <> 5 then raise exception 'Invalid demographics'; end if;
 if p_demographics->>'age_group' is null or not p_demographics->>'age_group' = any(ARRAY['18–22岁','23–27岁','28–31岁','32–35岁']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'gender' is null or not p_demographics->>'gender' = any(ARRAY['男','女','其他','不愿回答']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'education' is null or not p_demographics->>'education' = any(ARRAY['初中及以下','高中或中专','大专','本科','硕士及以上']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'upbringing' is null or not p_demographics->>'upbringing' = any(ARRAY['农村','县城','地级市','省会及以上城市']) then raise exception 'Invalid demographic option'; end if;
 if p_demographics->>'information_source' is null or not p_demographics->>'information_source' = any(ARRAY['短视频平台','社交媒体','新闻媒体','搜索引擎','多个境内外来源','亲友交流','其他']) then raise exception 'Invalid demographic option'; end if;
 duration := greatest(0,floor(extract(epoch from now()-s.started_at)))::integer;
 score := null;
 insert into public.survey_respondents(session_id,created_at,age_group,gender,education,upbringing,information_source,crt_score,duration_seconds,survey_version,minimum_reasonable_duration,possible_low_quality)
 values(p_session,s.started_at,p_demographics->>'age_group',p_demographics->>'gender',p_demographics->>'education',p_demographics->>'upbringing',p_demographics->>'information_source',score,duration,p_version,p_min_duration,duration<p_min_duration) returning * into r;
 insert into public.survey_answers(respondent_id,question_id,answer_numeric,is_correct)
 select r.id,x->>'question_id',(x->>'answer_numeric')::numeric,null::boolean from jsonb_array_elements(p_answers) x;
 return jsonb_build_object('public_id',r.public_id,'total',public.survey_count_version(p_version));
end; $$;

revoke all on function public.survey_submit_v1_short(uuid,text,jsonb,jsonb,integer) from public;
commit;
