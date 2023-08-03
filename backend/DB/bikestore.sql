PGDMP     #                    {         	   bikestore    15.3    15.3 B    K           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            L           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            M           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            N           1262    16504 	   bikestore    DATABASE        CREATE DATABASE bikestore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.utf8';
    DROP DATABASE bikestore;
                postgres    false            �            1259    16505    cliente    TABLE       CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_usuario character varying(55),
    rol_usuario character varying(50),
    direccion character varying(100),
    correo character varying(70),
    telefono bigint,
    contrasena character varying
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    16508    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            O           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    215            �            1259    16509 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_producto integer NOT NULL,
    texto character varying(255),
    fecha_comentario date,
    codigo_producto integer
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    16512    comentario_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.comentario_id_producto_seq;
       public          postgres    false    216            P           0    0    comentario_id_producto_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.comentario_id_producto_seq OWNED BY public.comentario.id_producto;
          public          postgres    false    217            �            1259    16513    compra    TABLE     �   CREATE TABLE public.compra (
    id_compra integer NOT NULL,
    fecha_compra date,
    estado character varying(100),
    codigo_cliente integer,
    detalle_compra integer
);
    DROP TABLE public.compra;
       public         heap    postgres    false            �            1259    16516    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            Q           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    16517    detalle_compra    TABLE        CREATE TABLE public.detalle_compra (
    id_detalle integer NOT NULL,
    fecha_pedido date,
    cantidad integer,
    direccion character varying(100),
    estado_entrega character varying(100),
    precio double precision,
    codigo_producto integer
);
 "   DROP TABLE public.detalle_compra;
       public         heap    postgres    false            �            1259    16520    detalle_compra_id_detalle_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_compra_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.detalle_compra_id_detalle_seq;
       public          postgres    false    220            R           0    0    detalle_compra_id_detalle_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.detalle_compra_id_detalle_seq OWNED BY public.detalle_compra.id_detalle;
          public          postgres    false    221            �            1259    16697    imagen_producto    TABLE     v   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    nombre_imagen text,
    ruta_imagen text
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    16521 
   metodopago    TABLE     �   CREATE TABLE public.metodopago (
    id_metodopago integer NOT NULL,
    nombre character varying(200),
    descripcion character varying(200)
);
    DROP TABLE public.metodopago;
       public         heap    postgres    false            �            1259    16524    metodopago_id_metodopago_seq    SEQUENCE     �   CREATE SEQUENCE public.metodopago_id_metodopago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.metodopago_id_metodopago_seq;
       public          postgres    false    222            S           0    0    metodopago_id_metodopago_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.metodopago_id_metodopago_seq OWNED BY public.metodopago.id_metodopago;
          public          postgres    false    223            �            1259    16525    pago    TABLE     �   CREATE TABLE public.pago (
    id_pago integer NOT NULL,
    total double precision,
    codigo_cliente integer,
    codigo_metodopago integer
);
    DROP TABLE public.pago;
       public         heap    postgres    false            �            1259    16528    pago_id_pago_seq    SEQUENCE     �   CREATE SEQUENCE public.pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pago_id_pago_seq;
       public          postgres    false    224            T           0    0    pago_id_pago_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pago_id_pago_seq OWNED BY public.pago.id_pago;
          public          postgres    false    225            �            1259    16529    producto    TABLE     -  CREATE TABLE public.producto (
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
       public         heap    postgres    false            �            1259    16534    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    226            U           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    227            �            1259    16535 	   productos    TABLE     k   CREATE TABLE public.productos (
    nombre_producto character varying,
    id_producto integer NOT NULL
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �           2604    16540    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    215    214            �           2604    16541    comentario id_producto    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_producto SET DEFAULT nextval('public.comentario_id_producto_seq'::regclass);
 E   ALTER TABLE public.comentario ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    217    216            �           2604    16542    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    16543    detalle_compra id_detalle    DEFAULT     �   ALTER TABLE ONLY public.detalle_compra ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_compra_id_detalle_seq'::regclass);
 H   ALTER TABLE public.detalle_compra ALTER COLUMN id_detalle DROP DEFAULT;
       public          postgres    false    221    220            �           2604    16544    metodopago id_metodopago    DEFAULT     �   ALTER TABLE ONLY public.metodopago ALTER COLUMN id_metodopago SET DEFAULT nextval('public.metodopago_id_metodopago_seq'::regclass);
 G   ALTER TABLE public.metodopago ALTER COLUMN id_metodopago DROP DEFAULT;
       public          postgres    false    223    222            �           2604    16545    pago id_pago    DEFAULT     l   ALTER TABLE ONLY public.pago ALTER COLUMN id_pago SET DEFAULT nextval('public.pago_id_pago_seq'::regclass);
 ;   ALTER TABLE public.pago ALTER COLUMN id_pago DROP DEFAULT;
       public          postgres    false    225    224            �           2604    16546    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    227    226            9          0    16505    cliente 
   TABLE DATA           s   COPY public.cliente (id_cliente, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena) FROM stdin;
    public          postgres    false    214   JN       ;          0    16509 
   comentario 
   TABLE DATA           [   COPY public.comentario (id_producto, texto, fecha_comentario, codigo_producto) FROM stdin;
    public          postgres    false    216   �N       =          0    16513    compra 
   TABLE DATA           a   COPY public.compra (id_compra, fecha_compra, estado, codigo_cliente, detalle_compra) FROM stdin;
    public          postgres    false    218   �N       ?          0    16517    detalle_compra 
   TABLE DATA           �   COPY public.detalle_compra (id_detalle, fecha_pedido, cantidad, direccion, estado_entrega, precio, codigo_producto) FROM stdin;
    public          postgres    false    220   �N       H          0    16697    imagen_producto 
   TABLE DATA           P   COPY public.imagen_producto (id_imagen, nombre_imagen, ruta_imagen) FROM stdin;
    public          postgres    false    229   �N       A          0    16521 
   metodopago 
   TABLE DATA           H   COPY public.metodopago (id_metodopago, nombre, descripcion) FROM stdin;
    public          postgres    false    222   O       C          0    16525    pago 
   TABLE DATA           Q   COPY public.pago (id_pago, total, codigo_cliente, codigo_metodopago) FROM stdin;
    public          postgres    false    224   7O       E          0    16529    producto 
   TABLE DATA           �   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock, precio, tipo, color, codigo_imagen) FROM stdin;
    public          postgres    false    226   TO       G          0    16535 	   productos 
   TABLE DATA           A   COPY public.productos (nombre_producto, id_producto) FROM stdin;
    public          postgres    false    228   �P       V           0    0    cliente_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 1, true);
          public          postgres    false    215            W           0    0    comentario_id_producto_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.comentario_id_producto_seq', 1, false);
          public          postgres    false    217            X           0    0    compra_id_compra_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.compra_id_compra_seq', 1, false);
          public          postgres    false    219            Y           0    0    detalle_compra_id_detalle_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.detalle_compra_id_detalle_seq', 1, false);
          public          postgres    false    221            Z           0    0    metodopago_id_metodopago_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.metodopago_id_metodopago_seq', 1, false);
          public          postgres    false    223            [           0    0    pago_id_pago_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pago_id_pago_seq', 1, false);
          public          postgres    false    225            \           0    0    producto_id_producto_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.producto_id_producto_seq', 5, true);
          public          postgres    false    227            �           2606    16548    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    16550    comentario comentario_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_producto);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    16552    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    16554 "   detalle_compra detalle_compra_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.detalle_compra
    ADD CONSTRAINT detalle_compra_pkey PRIMARY KEY (id_detalle);
 L   ALTER TABLE ONLY public.detalle_compra DROP CONSTRAINT detalle_compra_pkey;
       public            postgres    false    220            �           2606    16703 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    229            �           2606    16556    metodopago metodopago_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT metodopago_pkey PRIMARY KEY (id_metodopago);
 D   ALTER TABLE ONLY public.metodopago DROP CONSTRAINT metodopago_pkey;
       public            postgres    false    222            �           2606    16558    pago pago_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);
 8   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_pkey;
       public            postgres    false    224            �           2606    16560    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    226            �           2606    16562    productos productos_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    228            �           2606    16563 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    3231    216    226            �           2606    16568 !   compra compra_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 K   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_codigo_cliente_fkey;
       public          postgres    false    214    218    3219            �           2606    16573 2   detalle_compra detalle_compra_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_compra
    ADD CONSTRAINT detalle_compra_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 \   ALTER TABLE ONLY public.detalle_compra DROP CONSTRAINT detalle_compra_codigo_producto_fkey;
       public          postgres    false    3231    220    226            �           2606    16578    compra fk_detalle_compra    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT fk_detalle_compra FOREIGN KEY (detalle_compra) REFERENCES public.detalle_compra(id_detalle);
 B   ALTER TABLE ONLY public.compra DROP CONSTRAINT fk_detalle_compra;
       public          postgres    false    220    218    3225            �           2606    16704    producto fk_imagen_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT fk_imagen_producto FOREIGN KEY (codigo_imagen) REFERENCES public.imagen_producto(id_imagen);
 E   ALTER TABLE ONLY public.producto DROP CONSTRAINT fk_imagen_producto;
       public          postgres    false    229    3235    226            �           2606    16583    pago pago_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 G   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_codigo_cliente_fkey;
       public          postgres    false    3219    214    224            �           2606    16588     pago pago_codigo_metodopago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_codigo_metodopago_fkey FOREIGN KEY (codigo_metodopago) REFERENCES public.pago(id_pago);
 J   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_codigo_metodopago_fkey;
       public          postgres    false    3229    224    224            9   L   x�3�����Sp�O�-.M,���tN��IUpK�)NT042��*�K�OuH�H�-�I�K����53�������� ��      ;      x������ � �      =      x������ � �      ?      x������ � �      H      x������ � �      A      x������ � �      C      x������ � �      E   N  x�E��N�0��ۧ�7�����	�� ����l�;�7����[*n�<��gv	ybvظ=���إ��p
G���8	q��c�o��e	˪,�������b�h�LC����9�J�=�]܄�_pt����xK�dd��
�J�뺨kxd��w6A����lؤ�,~��=��xAq#M�앍�Ё�Ƌf*`U�R�����Bt���>��a�>D1[&lCor1��.�	��/X=	�Y��Ppfu֠h/ � �i���T��){TЊq��[!bl��ts<������w|£�#nϺ\~�9r;/a$��W�-����b6�)��/K�       G   1   x�K�L�L�I-ITHJ�K���4�J���*���$ޘ�i����� ���     