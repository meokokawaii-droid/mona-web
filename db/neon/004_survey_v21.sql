begin;
alter table public.survey_respondents drop constraint if exists survey_respondents_education_check;
alter table public.survey_respondents add constraint survey_respondents_education_check check (education = any(ARRAY['初中及以下','高中 / 中专 / 职高','大专','本科','硕士及以上','高中或中专','高中 / 中专']));
alter table public.survey_respondents drop constraint if exists survey_respondents_upbringing_check;
alter table public.survey_respondents add constraint survey_respondents_upbringing_check check (upbringing = any(ARRAY['农村','县城 / 县级市','地级市','省会及以上城市','县城','省会及以上']));
alter table public.survey_respondents drop constraint if exists survey_respondents_family_economic_status_check;
alter table public.survey_respondents add constraint survey_respondents_family_economic_status_check check (family_economic_status = any(ARRAY['明显低于周围平均水平','略低于平均水平','大致平均','略高于平均水平','明显高于平均水平','不确定或不愿回答']));
alter table public.survey_respondents drop constraint if exists survey_respondents_overseas_experience_category_check;
alter table public.survey_respondents add constraint survey_respondents_overseas_experience_category_check check (overseas_experience_category = any(ARRAY['无','仅短期旅行','曾学习或工作','曾长期生活','有学习或工作经历','有长期生活经历']));
alter table public.survey_respondents add constraint survey_v21_fields check(survey_version <> 'V2.1' or (crt_score is null and age_group is not null and current_residence is not null and family_economic_status is not null and overseas_experience_category is not null and information_channels is not null and cardinality(information_channels) between 1 and 16));
create or replace function public.survey_validate_answer() returns trigger language plpgsql security invoker set search_path='' as $$
declare version text; numeric_question boolean; allowed text[];
begin select survey_version into version from public.survey_respondents where id=new.respondent_id;
if version='V2.1' then allowed:=ARRAY['A1','A2','A3','A4','A5','B1','B2','B3','B4','B5','C1','C2','C3','C4','C5','D1','D2','D3','D4','D5','E1','E2','E3','E4','E5','F1','F2','F3','F4','F5','G1','G2','G3','G4','G5','H1','H2','H3','H4','H5','I1','I2','I3','I4','I5']; numeric_question:=false;
elsif version='2.0-final' then allowed:=ARRAY['A1','A2','A3','A4','B1','B2','B3','B4','C1','C2','C3','C4','D1','D2','D3','D4','E1','E2','E3','E4','F1','F2','F3','F4','G1','G2','G3','G4','P1','P2','P3','P4','S1','S2','S3','S4','S5','S6','H1','H2','H3','H4']; numeric_question:=false;
elsif version='1.0-final' then allowed:=ARRAY['A1','A2','A3','A4','A5','A6','B1','B2','B3','B4','B5','B6','C1','C2','C3','C4','C5','C6','C7','D1','D2','D3','D4','D5','D6','D7','E1','E2','E3','E4','E5','E6','E7','F1','F2','F3','F4','F5','F6','F7','G1','G2','G3','G4','G5','G6','G7','H1','H2','H3','I1','I2','I3','I4','I5']; numeric_question:=new.question_id in ('H1','H2','H3');
elsif version='1.0' then allowed:=ARRAY['A1','A2','A3','A4','B1','B2','B3','B4','B5','C1','C2','C3','C4','C5','D1','D2','D3','D4','E1','E2','E3','E4','E5','E6','F1','F2','F3','F4','G1','G2','G3','G4','H1','H2','I1','I2','I3']; numeric_question:=new.question_id in ('I1','I2','I3');
else raise exception 'Unknown questionnaire revision'; end if;
if not new.question_id=any(allowed) then raise exception 'Unknown question'; end if;
if numeric_question then if new.is_correct is null then raise exception 'CRT correctness required'; end if;
else if new.answer_numeric not between 1 and 7 or new.answer_numeric<>trunc(new.answer_numeric) or new.is_correct is not null then raise exception 'Invalid scale answer'; end if; end if; return new; end; $$;
create or replace function public.survey_submit_v21(p_session uuid,p_version text,p_demographics jsonb,p_answers jsonb,p_min_duration integer) returns jsonb language plpgsql security invoker set search_path='' as $$
declare s public.survey_sessions;r public.survey_respondents;duration integer;expected text[]:=ARRAY['A1','A2','A3','A4','A5','B1','B2','B3','B4','B5','C1','C2','C3','C4','C5','D1','D2','D3','D4','D5','E1','E2','E3','E4','E5','F1','F2','F3','F4','F5','G1','G2','G3','G4','G5','H1','H2','H3','H4','H5','I1','I2','I3','I4','I5'];channels text[];
begin select * into s from public.survey_sessions where id=p_session for update;if not found then raise exception 'Unknown session';end if;
if p_version<>'V2.1' or s.survey_version<>p_version then raise exception 'Invalid questionnaire revision';end if;
select * into r from public.survey_respondents where session_id=p_session;if found then return jsonb_build_object('public_id',r.public_id,'total',public.survey_count_version(p_version));end if;
if s.started_at<now()-interval '30 days' then raise exception 'Expired session';end if;
if jsonb_typeof(p_answers)<>'array' or jsonb_array_length(p_answers)<>45 or (select count(distinct x->>'question_id') from jsonb_array_elements(p_answers)x where x->>'question_id'=any(expected))<>45 then raise exception 'Incomplete answers';end if;
if jsonb_typeof(p_demographics)<>'object' or (select count(*) from jsonb_object_keys(p_demographics))<>8 then raise exception 'Invalid demographics';end if;
if not p_demographics->>'age_group'=any(ARRAY['18–22岁','23–27岁','28–31岁','32–35岁']) or not p_demographics->>'gender'=any(ARRAY['男','女','其他','不愿回答']) or not p_demographics->>'education'=any(ARRAY['初中及以下','高中 / 中专 / 职高','大专','本科','硕士及以上']) or not p_demographics->>'upbringing'=any(ARRAY['农村','县城 / 县级市','地级市','省会及以上城市']) or not p_demographics->>'current_residence'=any(ARRAY['农村','县城 / 县级市','地级市','省会及以上城市']) or not p_demographics->>'family_economic_status'=any(ARRAY['明显低于周围平均水平','略低于平均水平','大致平均','略高于平均水平','明显高于平均水平']) or not p_demographics->>'overseas_experience_category'=any(ARRAY['无','仅短期旅行','曾学习或工作','曾长期生活']) then raise exception 'Invalid demographic option';end if;
if jsonb_typeof(p_demographics->'information_channels')<>'array' then raise exception 'Invalid information channels';end if;
select array_agg(value) into channels from jsonb_array_elements_text(p_demographics->'information_channels');if cardinality(channels) not between 1 and 16 or cardinality(channels)<>(select count(distinct x) from unnest(channels)x) or exists(select 1 from unnest(channels)x where not x=any(ARRAY['抖音 / 快手等短视频平台','微博','微信公众号 / 视频号','B站','小红书','知乎','今日头条 / 新闻客户端','国内门户网站','电视 / 报纸等传统媒体','搜索引擎','海外媒体','X / YouTube / Reddit等境外平台','AI工具','家人、朋友、同学或同事','基本不主动关注','其他'])) then raise exception 'Invalid information channels';end if;
duration:=greatest(0,floor(extract(epoch from now()-s.started_at)))::integer;
insert into public.survey_respondents(session_id,created_at,age_group,gender,education,upbringing,current_residence,family_economic_status,overseas_experience_category,information_channels,information_source,crt_score,duration_seconds,survey_version,minimum_reasonable_duration,possible_low_quality)
values(p_session,s.started_at,p_demographics->>'age_group',p_demographics->>'gender',p_demographics->>'education',p_demographics->>'upbringing',p_demographics->>'current_residence',p_demographics->>'family_economic_status',p_demographics->>'overseas_experience_category',channels,null,null,duration,p_version,p_min_duration,duration<p_min_duration) returning * into r;
insert into public.survey_answers(respondent_id,question_id,answer_numeric,is_correct) select r.id,x->>'question_id',(x->>'answer_numeric')::numeric,null from jsonb_array_elements(p_answers)x;
return jsonb_build_object('public_id',r.public_id,'total',public.survey_count_version(p_version));end; $$;
revoke all on function public.survey_submit_v21(uuid,text,jsonb,jsonb,integer) from public;
commit;
