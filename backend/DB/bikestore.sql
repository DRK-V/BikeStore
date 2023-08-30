--
-- PostgreSQL database cluster dump
--

-- Started on 2023-08-30 17:03:01

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:z2pIA4ij3HEVnZgT9QKkkg==$r4UTwk0WeIQerlFy1UUcz2ZcrpM+kre80Nm/YktQ9N4=:yIjSt+VYl0gRyOANc4v3QIPRACvmWN+AyVJzXlumDLQ=';

--
-- User Configurations
--








-- Completed on 2023-08-30 17:03:01

--
-- PostgreSQL database cluster dump complete
--

