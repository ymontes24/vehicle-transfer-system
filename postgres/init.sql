--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 16.4

-- Started on 2025-05-24 11:16:51 -05

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

--
-- TOC entry 2 (class 3079 OID 16385)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 858 (class 1247 OID 16397)
-- Name: transfer_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transfer_type AS ENUM (
    'acquisition',
    'sale',
    'rental',
    'maintenance',
    'other'
);


ALTER TYPE public.transfer_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16487)
-- Name: organizational_units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizational_units (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    project_id uuid,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.organizational_units OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16407)
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16475)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16431)
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16419)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16544)
-- Name: transfers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transfers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type public.transfer_type NOT NULL,
    vehicle_id uuid,
    client_id uuid,
    transmitter_id uuid,
    project_id uuid,
    organizational_unit_id uuid,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.transfers OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16517)
-- Name: user_organizational_units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_organizational_units (
    user_id uuid NOT NULL,
    organizational_unit_id uuid NOT NULL
);


ALTER TABLE public.user_organizational_units OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16502)
-- Name: user_projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_projects (
    user_id uuid NOT NULL,
    project_id uuid NOT NULL
);


ALTER TABLE public.user_projects OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16460)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id uuid NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16446)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16532)
-- Name: vehicles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    plate text NOT NULL,
    service text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.vehicles OWNER TO postgres;

--
-- TOC entry 3512 (class 0 OID 16487)
-- Dependencies: 221
-- Data for Name: organizational_units; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizational_units (id, name, project_id, created_at, updated_at) FROM stdin;
dba41614-a9e7-4f75-9152-6bbdd80b08ad	Headquarters	1b3c91a3-e3c8-4265-9a65-13adab84cfaa	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
0e727b85-d610-4a26-a835-b2c9734ea2ac	Distribution Center	dca24f32-4b12-4b6c-b47c-7890b39adfc2	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
\.


--
-- TOC entry 3506 (class 0 OID 16407)
-- Dependencies: 215
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, name, description, created_at, updated_at) FROM stdin;
153d777d-6665-4742-8f05-8c77f8a8e029	view_transfers	Can view transfers	2025-05-24 16:04:23.973309	2025-05-24 16:04:23.973309
09f475a9-ac25-4ccd-9d56-a219504d5fb4	create_transfers	Can create transfers	2025-05-24 16:04:23.973309	2025-05-24 16:04:23.973309
f2805a35-f0e6-4098-ad7a-9ccc0892974c	edit_transfers	Can edit transfers	2025-05-24 16:04:23.973309	2025-05-24 16:04:23.973309
656fd361-69dd-4f70-a0e7-6b73b557f382	delete_transfers	Can delete transfers	2025-05-24 16:04:23.973309	2025-05-24 16:04:23.973309
\.


--
-- TOC entry 3511 (class 0 OID 16475)
-- Dependencies: 220
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, description, created_at, updated_at) FROM stdin;
1b3c91a3-e3c8-4265-9a65-13adab84cfaa	Fleet Management	Company vehicle fleet management project	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
dca24f32-4b12-4b6c-b47c-7890b39adfc2	Logistics Operations	Logistics and delivery operations project	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
\.


--
-- TOC entry 3508 (class 0 OID 16431)
-- Dependencies: 217
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
3f2f3fd4-c158-4122-8df4-466f47bbbc06	153d777d-6665-4742-8f05-8c77f8a8e029
3f2f3fd4-c158-4122-8df4-466f47bbbc06	09f475a9-ac25-4ccd-9d56-a219504d5fb4
3f2f3fd4-c158-4122-8df4-466f47bbbc06	f2805a35-f0e6-4098-ad7a-9ccc0892974c
3f2f3fd4-c158-4122-8df4-466f47bbbc06	656fd361-69dd-4f70-a0e7-6b73b557f382
2ba5f0c5-1f30-411a-b650-09a9c7fb5cf2	153d777d-6665-4742-8f05-8c77f8a8e029
2ba5f0c5-1f30-411a-b650-09a9c7fb5cf2	09f475a9-ac25-4ccd-9d56-a219504d5fb4
2ba5f0c5-1f30-411a-b650-09a9c7fb5cf2	f2805a35-f0e6-4098-ad7a-9ccc0892974c
fd69afe0-5a0f-437a-92ba-a87bdd1bb8b6	153d777d-6665-4742-8f05-8c77f8a8e029
\.


--
-- TOC entry 3507 (class 0 OID 16419)
-- Dependencies: 216
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, description, created_at, updated_at) FROM stdin;
3f2f3fd4-c158-4122-8df4-466f47bbbc06	admin	Administrator with full access	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
2ba5f0c5-1f30-411a-b650-09a9c7fb5cf2	manager	Project manager with limited access	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
fd69afe0-5a0f-437a-92ba-a87bdd1bb8b6	operator	Basic operator with view access	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
\.


--
-- TOC entry 3516 (class 0 OID 16544)
-- Dependencies: 225
-- Data for Name: transfers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transfers (id, type, vehicle_id, client_id, transmitter_id, project_id, organizational_unit_id, created_at, updated_at) FROM stdin;
827311c9-7739-4bf7-855c-4354a00fa949	rental	9e00b790-5e7f-49aa-a9af-0562caeba0c1	e6be5f1e-3eed-4772-9ad0-506b2ee1770d	0dd92c02-89dd-4c44-9883-1618cace6374	dca24f32-4b12-4b6c-b47c-7890b39adfc2	0e727b85-d610-4a26-a835-b2c9734ea2ac	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
923ec780-7a52-4723-b111-9c4dfc5f9a89	acquisition	24dc8178-8633-4669-baa4-8743c86f80d9	0dd92c02-89dd-4c44-9883-1618cace6374	84327f28-575a-4dc6-8a9d-4a955d36b8ec	1b3c91a3-e3c8-4265-9a65-13adab84cfaa	dba41614-a9e7-4f75-9152-6bbdd80b08ad	2025-05-24 16:14:03.722511	2025-05-24 16:14:03.722511
\.


--
-- TOC entry 3514 (class 0 OID 16517)
-- Dependencies: 223
-- Data for Name: user_organizational_units; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_organizational_units (user_id, organizational_unit_id) FROM stdin;
0dd92c02-89dd-4c44-9883-1618cace6374	dba41614-a9e7-4f75-9152-6bbdd80b08ad
0dd92c02-89dd-4c44-9883-1618cace6374	0e727b85-d610-4a26-a835-b2c9734ea2ac
84327f28-575a-4dc6-8a9d-4a955d36b8ec	dba41614-a9e7-4f75-9152-6bbdd80b08ad
e6be5f1e-3eed-4772-9ad0-506b2ee1770d	dba41614-a9e7-4f75-9152-6bbdd80b08ad
e6be5f1e-3eed-4772-9ad0-506b2ee1770d	0e727b85-d610-4a26-a835-b2c9734ea2ac
\.


--
-- TOC entry 3513 (class 0 OID 16502)
-- Dependencies: 222
-- Data for Name: user_projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_projects (user_id, project_id) FROM stdin;
0dd92c02-89dd-4c44-9883-1618cace6374	1b3c91a3-e3c8-4265-9a65-13adab84cfaa
0dd92c02-89dd-4c44-9883-1618cace6374	dca24f32-4b12-4b6c-b47c-7890b39adfc2
84327f28-575a-4dc6-8a9d-4a955d36b8ec	1b3c91a3-e3c8-4265-9a65-13adab84cfaa
e6be5f1e-3eed-4772-9ad0-506b2ee1770d	1b3c91a3-e3c8-4265-9a65-13adab84cfaa
e6be5f1e-3eed-4772-9ad0-506b2ee1770d	dca24f32-4b12-4b6c-b47c-7890b39adfc2
\.


--
-- TOC entry 3510 (class 0 OID 16460)
-- Dependencies: 219
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id) FROM stdin;
0dd92c02-89dd-4c44-9883-1618cace6374	3f2f3fd4-c158-4122-8df4-466f47bbbc06
84327f28-575a-4dc6-8a9d-4a955d36b8ec	2ba5f0c5-1f30-411a-b650-09a9c7fb5cf2
e6be5f1e-3eed-4772-9ad0-506b2ee1770d	fd69afe0-5a0f-437a-92ba-a87bdd1bb8b6
\.


--
-- TOC entry 3509 (class 0 OID 16446)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password_hash, created_at, updated_at) FROM stdin;
0dd92c02-89dd-4c44-9883-1618cace6374	admin	admin@example.com	$2b$10$RxHNqCeLGzKZUjx2uqGR3erB/sVZGIxdmgd1/B172YsRkceJWG0P.	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
84327f28-575a-4dc6-8a9d-4a955d36b8ec	manager	manager@example.com	$2b$10$RxHNqCeLGzKZUjx2uqGR3erB/sVZGIxdmgd1/B172YsRkceJWG0P.	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
e6be5f1e-3eed-4772-9ad0-506b2ee1770d	operator	operator@example.com	$2b$10$RxHNqCeLGzKZUjx2uqGR3erB/sVZGIxdmgd1/B172YsRkceJWG0P.	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
\.


--
-- TOC entry 3515 (class 0 OID 16532)
-- Dependencies: 224
-- Data for Name: vehicles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicles (id, plate, service, created_at, updated_at) FROM stdin;
24dc8178-8633-4669-baa4-8743c86f80d9	ABC123	Delivery	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
9e00b790-5e7f-49aa-a9af-0562caeba0c1	XYZ789	Executive	2025-05-24 16:04:23.97373	2025-05-24 16:04:23.97373
\.


--
-- TOC entry 3339 (class 2606 OID 16496)
-- Name: organizational_units organizational_units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizational_units
    ADD CONSTRAINT organizational_units_pkey PRIMARY KEY (id);


--
-- TOC entry 3317 (class 2606 OID 16418)
-- Name: permissions permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_key UNIQUE (name);


--
-- TOC entry 3319 (class 2606 OID 16416)
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 3335 (class 2606 OID 16486)
-- Name: projects projects_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_name_key UNIQUE (name);


--
-- TOC entry 3337 (class 2606 OID 16484)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 3325 (class 2606 OID 16435)
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- TOC entry 3321 (class 2606 OID 16430)
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- TOC entry 3323 (class 2606 OID 16428)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3349 (class 2606 OID 16551)
-- Name: transfers transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (id);


--
-- TOC entry 3343 (class 2606 OID 16521)
-- Name: user_organizational_units user_organizational_units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_organizational_units
    ADD CONSTRAINT user_organizational_units_pkey PRIMARY KEY (user_id, organizational_unit_id);


--
-- TOC entry 3341 (class 2606 OID 16506)
-- Name: user_projects user_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_projects
    ADD CONSTRAINT user_projects_pkey PRIMARY KEY (user_id, project_id);


--
-- TOC entry 3333 (class 2606 OID 16464)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 3327 (class 2606 OID 16459)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3329 (class 2606 OID 16455)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3331 (class 2606 OID 16457)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3345 (class 2606 OID 16541)
-- Name: vehicles vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (id);


--
-- TOC entry 3347 (class 2606 OID 16543)
-- Name: vehicles vehicles_plate_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT vehicles_plate_key UNIQUE (plate);


--
-- TOC entry 3354 (class 2606 OID 16497)
-- Name: organizational_units organizational_units_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizational_units
    ADD CONSTRAINT organizational_units_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- TOC entry 3350 (class 2606 OID 16441)
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- TOC entry 3351 (class 2606 OID 16436)
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 3359 (class 2606 OID 16557)
-- Name: transfers transfers_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- TOC entry 3360 (class 2606 OID 16572)
-- Name: transfers transfers_organizational_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_organizational_unit_id_fkey FOREIGN KEY (organizational_unit_id) REFERENCES public.organizational_units(id);


--
-- TOC entry 3361 (class 2606 OID 16567)
-- Name: transfers transfers_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- TOC entry 3362 (class 2606 OID 16562)
-- Name: transfers transfers_transmitter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_transmitter_id_fkey FOREIGN KEY (transmitter_id) REFERENCES public.users(id);


--
-- TOC entry 3363 (class 2606 OID 16552)
-- Name: transfers transfers_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transfers
    ADD CONSTRAINT transfers_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id);


--
-- TOC entry 3357 (class 2606 OID 16527)
-- Name: user_organizational_units user_organizational_units_organizational_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_organizational_units
    ADD CONSTRAINT user_organizational_units_organizational_unit_id_fkey FOREIGN KEY (organizational_unit_id) REFERENCES public.organizational_units(id) ON DELETE CASCADE;


--
-- TOC entry 3358 (class 2606 OID 16522)
-- Name: user_organizational_units user_organizational_units_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_organizational_units
    ADD CONSTRAINT user_organizational_units_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3355 (class 2606 OID 16512)
-- Name: user_projects user_projects_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_projects
    ADD CONSTRAINT user_projects_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- TOC entry 3356 (class 2606 OID 16507)
-- Name: user_projects user_projects_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_projects
    ADD CONSTRAINT user_projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3352 (class 2606 OID 16470)
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 3353 (class 2606 OID 16465)
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-05-24 11:16:51 -05

--
-- PostgreSQL database dump complete
--

