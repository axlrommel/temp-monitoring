# temp-monitoring

`create schema "temperatures;`

`CREATE SEQUENCE "temperatures".readings_seq;`

`CREATE TABLE temperatures.readings (
    id integer DEFAULT nextval('readings_seq'::regclass) PRIMARY KEY,
    device text,
    temperature numeric,
    timestamp integer
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX readings_pkey ON temperatures.readings(id int4_ops);`