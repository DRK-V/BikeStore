--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-26 22:25:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16400)
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    nombre_producto character varying,
    id_producto integer NOT NULL
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- TOC entry 3316 (class 0 OID 16400)
-- Dependencies: 214
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (nombre_producto, id_producto) FROM stdin;
bicicleta beneli	1
bicicleta de montaña	2
\.


--
-- TOC entry 3173 (class 2606 OID 16408)
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);


-- Completed on 2023-07-26 22:25:47

--
-- PostgreSQL database dump complete
--

