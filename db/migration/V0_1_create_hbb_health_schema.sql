CREATE SCHEMA IF NOT EXISTS hbb_health;

CREATE TABLE IF NOT EXISTS hbb_health.records (
    id BIGSERIAL not null primary key,
    user_id SERIAL not null,
    childhood_disease VARCHAR not null,
    major_adult_disease VARCHAR not null,
    surgeries VARCHAR not null,
    prior_injuries VARCHAR not null,
    medications VARCHAR not null,
    allergies VARCHAR not null,
    created_at timestamp default now() not null
);

CREATE INDEX IF NOT EXISTS records_user_id_index ON hbb_health.records(user_id);
