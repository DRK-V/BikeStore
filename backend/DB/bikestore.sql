PGDMP                         {         	   bikestore    15.3    15.3 I    U           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            V           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            W           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            X           1262    16650 	   bikestore    DATABASE     |   CREATE DATABASE bikestore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE bikestore;
                postgres    false            �            1259    16651    cliente    TABLE       CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_usuario character varying(55),
    rol_usuario character varying(50),
    direccion character varying(100),
    correo character varying(70),
    telefono bigint,
    contrasena character varying
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    16656    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            Y           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    215            �            1259    16657 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_producto integer NOT NULL,
    texto character varying(255),
    fecha_comentario date,
    codigo_producto integer
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    16660    comentario_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.comentario_id_producto_seq;
       public          postgres    false    216            Z           0    0    comentario_id_producto_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.comentario_id_producto_seq OWNED BY public.comentario.id_producto;
          public          postgres    false    217            �            1259    16661    compra    TABLE     �   CREATE TABLE public.compra (
    id_compra integer NOT NULL,
    fecha_compra date,
    estado character varying(100),
    codigo_cliente integer,
    detalle_compra integer
);
    DROP TABLE public.compra;
       public         heap    postgres    false            �            1259    16664    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            [           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    16665    detalle_compra    TABLE        CREATE TABLE public.detalle_compra (
    id_detalle integer NOT NULL,
    fecha_pedido date,
    cantidad integer,
    direccion character varying(100),
    estado_entrega character varying(100),
    precio double precision,
    codigo_producto integer
);
 "   DROP TABLE public.detalle_compra;
       public         heap    postgres    false            �            1259    16668    detalle_compra_id_detalle_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_compra_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.detalle_compra_id_detalle_seq;
       public          postgres    false    220            \           0    0    detalle_compra_id_detalle_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.detalle_compra_id_detalle_seq OWNED BY public.detalle_compra.id_detalle;
          public          postgres    false    221            �            1259    16669    imagen_producto    TABLE     v   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    nombre_imagen text,
    ruta_imagen text
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    16674 
   metodopago    TABLE     �   CREATE TABLE public.metodopago (
    id_metodopago integer NOT NULL,
    nombre character varying(200),
    descripcion character varying(200)
);
    DROP TABLE public.metodopago;
       public         heap    postgres    false            �            1259    16677    metodopago_id_metodopago_seq    SEQUENCE     �   CREATE SEQUENCE public.metodopago_id_metodopago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.metodopago_id_metodopago_seq;
       public          postgres    false    223            ]           0    0    metodopago_id_metodopago_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.metodopago_id_metodopago_seq OWNED BY public.metodopago.id_metodopago;
          public          postgres    false    224            �            1259    16678    pago    TABLE     �   CREATE TABLE public.pago (
    id_pago integer NOT NULL,
    total double precision,
    codigo_cliente integer,
    codigo_metodopago integer
);
    DROP TABLE public.pago;
       public         heap    postgres    false            �            1259    16681    pago_id_pago_seq    SEQUENCE     �   CREATE SEQUENCE public.pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pago_id_pago_seq;
       public          postgres    false    225            ^           0    0    pago_id_pago_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pago_id_pago_seq OWNED BY public.pago.id_pago;
          public          postgres    false    226            �            1259    16682    producto    TABLE     -  CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(120),
    descripcion_producto character varying(255),
    stock integer,
    precio double precision,
    tipo character varying(100),
    color character varying(50),
    codigo_imagen integer
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    16687    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    227            _           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    228            �            1259    16688 	   productos    TABLE     k   CREATE TABLE public.productos (
    nombre_producto character varying,
    id_producto integer NOT NULL
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �            1259    16754    usuario    TABLE     F  CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    telefono character varying(20) NOT NULL,
    pais character varying(50) NOT NULL,
    ciudad character varying(50) NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16753    usuario_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_id_usuario_seq;
       public          postgres    false    231            `           0    0    usuario_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public          postgres    false    230            �           2604    16693    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    215    214            �           2604    16694    comentario id_producto    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_producto SET DEFAULT nextval('public.comentario_id_producto_seq'::regclass);
 E   ALTER TABLE public.comentario ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    217    216            �           2604    16695    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    16696    detalle_compra id_detalle    DEFAULT     �   ALTER TABLE ONLY public.detalle_compra ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_compra_id_detalle_seq'::regclass);
 H   ALTER TABLE public.detalle_compra ALTER COLUMN id_detalle DROP DEFAULT;
       public          postgres    false    221    220            �           2604    16697    metodopago id_metodopago    DEFAULT     �   ALTER TABLE ONLY public.metodopago ALTER COLUMN id_metodopago SET DEFAULT nextval('public.metodopago_id_metodopago_seq'::regclass);
 G   ALTER TABLE public.metodopago ALTER COLUMN id_metodopago DROP DEFAULT;
       public          postgres    false    224    223            �           2604    16698    pago id_pago    DEFAULT     l   ALTER TABLE ONLY public.pago ALTER COLUMN id_pago SET DEFAULT nextval('public.pago_id_pago_seq'::regclass);
 ;   ALTER TABLE public.pago ALTER COLUMN id_pago DROP DEFAULT;
       public          postgres    false    226    225            �           2604    16699    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    228    227            �           2604    16757    usuario id_usuario    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    230    231    231            A          0    16651    cliente 
   TABLE DATA           s   COPY public.cliente (id_cliente, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena) FROM stdin;
    public          postgres    false    214   �V       C          0    16657 
   comentario 
   TABLE DATA           [   COPY public.comentario (id_producto, texto, fecha_comentario, codigo_producto) FROM stdin;
    public          postgres    false    216   $W       E          0    16661    compra 
   TABLE DATA           a   COPY public.compra (id_compra, fecha_compra, estado, codigo_cliente, detalle_compra) FROM stdin;
    public          postgres    false    218   AW       G          0    16665    detalle_compra 
   TABLE DATA           �   COPY public.detalle_compra (id_detalle, fecha_pedido, cantidad, direccion, estado_entrega, precio, codigo_producto) FROM stdin;
    public          postgres    false    220   ^W       I          0    16669    imagen_producto 
   TABLE DATA           P   COPY public.imagen_producto (id_imagen, nombre_imagen, ruta_imagen) FROM stdin;
    public          postgres    false    222   {W       J          0    16674 
   metodopago 
   TABLE DATA           H   COPY public.metodopago (id_metodopago, nombre, descripcion) FROM stdin;
    public          postgres    false    223   �W       L          0    16678    pago 
   TABLE DATA           Q   COPY public.pago (id_pago, total, codigo_cliente, codigo_metodopago) FROM stdin;
    public          postgres    false    225   �W       N          0    16682    producto 
   TABLE DATA           �   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock, precio, tipo, color, codigo_imagen) FROM stdin;
    public          postgres    false    227   X       P          0    16688 	   productos 
   TABLE DATA           A   COPY public.productos (nombre_producto, id_producto) FROM stdin;
    public          postgres    false    229   dY       R          0    16754    usuario 
   TABLE DATA           ^   COPY public.usuario (id_usuario, nombre, email, password, telefono, pais, ciudad) FROM stdin;
    public          postgres    false    231   �Y       a           0    0    cliente_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 1, true);
          public          postgres    false    215            b           0    0    comentario_id_producto_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.comentario_id_producto_seq', 1, false);
          public          postgres    false    217            c           0    0    compra_id_compra_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.compra_id_compra_seq', 1, false);
          public          postgres    false    219            d           0    0    detalle_compra_id_detalle_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.detalle_compra_id_detalle_seq', 1, false);
          public          postgres    false    221            e           0    0    metodopago_id_metodopago_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.metodopago_id_metodopago_seq', 1, false);
          public          postgres    false    224            f           0    0    pago_id_pago_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pago_id_pago_seq', 1, false);
          public          postgres    false    226            g           0    0    producto_id_producto_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.producto_id_producto_seq', 5, true);
          public          postgres    false    228            h           0    0    usuario_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 1, true);
          public          postgres    false    230            �           2606    16701    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    16703    comentario comentario_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_producto);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    16705    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    16707 "   detalle_compra detalle_compra_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.detalle_compra
    ADD CONSTRAINT detalle_compra_pkey PRIMARY KEY (id_detalle);
 L   ALTER TABLE ONLY public.detalle_compra DROP CONSTRAINT detalle_compra_pkey;
       public            postgres    false    220            �           2606    16709 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    222            �           2606    16711    metodopago metodopago_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT metodopago_pkey PRIMARY KEY (id_metodopago);
 D   ALTER TABLE ONLY public.metodopago DROP CONSTRAINT metodopago_pkey;
       public            postgres    false    223            �           2606    16713    pago pago_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);
 8   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_pkey;
       public            postgres    false    225            �           2606    16715    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    227            �           2606    16717    productos productos_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    229            �           2606    16759    usuario usuario_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    231            �           2606    16718 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    227    3239    216            �           2606    16723 !   compra compra_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 K   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_codigo_cliente_fkey;
       public          postgres    false    218    3225    214            �           2606    16728 2   detalle_compra detalle_compra_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_compra
    ADD CONSTRAINT detalle_compra_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 \   ALTER TABLE ONLY public.detalle_compra DROP CONSTRAINT detalle_compra_codigo_producto_fkey;
       public          postgres    false    220    227    3239            �           2606    16733    compra fk_detalle_compra    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT fk_detalle_compra FOREIGN KEY (detalle_compra) REFERENCES public.detalle_compra(id_detalle);
 B   ALTER TABLE ONLY public.compra DROP CONSTRAINT fk_detalle_compra;
       public          postgres    false    220    218    3231            �           2606    16738    producto fk_imagen_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_imagen_producto FOREIGN KEY (codigo_imagen) REFERENCES public.imagen_producto(id_imagen);
 E   ALTER TABLE ONLY public.producto DROP CONSTRAINT fk_imagen_producto;
       public          postgres    false    227    222    3233            �           2606    16743    pago pago_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 G   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_codigo_cliente_fkey;
       public          postgres    false    3225    214    225            �           2606    16748     pago pago_codigo_metodopago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_codigo_metodopago_fkey FOREIGN KEY (codigo_metodopago) REFERENCES public.pago(id_pago);
 J   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_codigo_metodopago_fkey;
       public          postgres    false    3237    225    225            A   L   x�3�����Sp�O�-.M,���tN��IUpK�)NT042��*�K�OuH�H�-�I�K����53�������� ��      C      x������ � �      E      x������ � �      G      x������ � �      I   A   x�3���MLO�S0��������3�sR�
�ҹ�`����F`yc���`y��	��	X>F��� ��(H      J      x������ � �      L      x������ � �      N   N  x�E��N�0��ۧ�7�����	�� ����l�;�7����[*n�<��gv	ybvظ=���إ��p
G���8	q��c�o��e	˪,�������b�h�LC����9�J�=�]܄�_pt����xK�dd��
�J�뺨kxd��w6A����lؤ�,~��=��xAq#M�앍�Ё�Ƌf*`U�R�����Bt���>��a�>D1[&lCor1��.�	��/X=	�Y��Ppfu֠h/ � �i���T��){TЊq��[!bl��ts<������w|£�#nϺ\~�9r;/a$��W�-����b6�)��/K�       P   1   x�K�L�L�I-ITHJ�K���4�J���*���$ޘ�i����� ���      R   /   x�3�LI��L�S鹉�9z�����FƜƆF�)�� ����� =�~     