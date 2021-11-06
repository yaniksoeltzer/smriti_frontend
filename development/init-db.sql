CREATE DATABASE "pomo_timer";
\c pomo_timer


create table pomo (
      pomo_id serial primary key,
      pomo_type text not null,
      planned_duration interval not null,
      started_at timestamptz not null,
      finished_at timestamptz
);


/* pomo_intermission */
create table pomo_intermission
(
    pomo_intermission_id serial,
    pomo_id int,
    started_at timestamptz,
    finished_at timestamptz,
    duration interval generated always as (finished_at - started_at) stored,
    PRIMARY KEY (pomo_intermission_id),
    FOREIGN KEY (pomo_id) references pomo(pomo_id)
);



create view pause_status as select
                                pomo.pomo_id,
                                coalesce(paused_time,'0 seconds') as paused_time,
                                paused_at
                            from pomo
                                     left join (
                                select pomo_id, sum(duration) as paused_time from pomo_intermission
                                where duration is not null
                                group by pomo_id
                            ) pt on pt.pomo_id = pomo.pomo_id
                                     left join (
                                select pomo_id, max(started_at) as paused_at from pomo_intermission
                                where finished_at is null
                                group by pomo_id
                            ) ot on ot.pomo_id = pomo.pomo_id
;