PGDMP                           {         	   bikestore    15.3    15.3 C    K           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            L           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            M           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            N           1262    25468 	   bikestore    DATABASE     |   CREATE DATABASE bikestore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE bikestore;
                postgres    false            �            1259    25469    cliente    TABLE     m  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_usuario character varying(55),
    rol_usuario character varying(50),
    direccion character varying(100),
    correo character varying(70),
    telefono bigint,
    contrasena character varying,
    tipo_de_documento character varying(10),
    numero_de_documento character varying(50)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    25474    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            O           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    215            �            1259    25475 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_producto integer NOT NULL,
    texto character varying(255),
    fecha_comentario date,
    codigo_producto integer
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    25478    comentario_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.comentario_id_producto_seq;
       public          postgres    false    216            P           0    0    comentario_id_producto_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.comentario_id_producto_seq OWNED BY public.comentario.id_producto;
          public          postgres    false    217            �            1259    25479    compra    TABLE     �   CREATE TABLE public.compra (
    id_compra integer NOT NULL,
    fecha_compra date,
    estado character varying(100),
    codigo_cliente integer,
    detalle_compra integer
);
    DROP TABLE public.compra;
       public         heap    postgres    false            �            1259    25482    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            Q           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    25483    detalle_compra    TABLE     �   CREATE TABLE public.detalle_compra (
    id_detalle integer NOT NULL,
    fecha_pedido date,
    direccion character varying(100),
    estado_entrega character varying(100),
    precio double precision,
    codigo_cliente integer
);
 "   DROP TABLE public.detalle_compra;
       public         heap    postgres    false            �            1259    25486    detalle_compra_id_detalle_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_compra_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.detalle_compra_id_detalle_seq;
       public          postgres    false    220            R           0    0    detalle_compra_id_detalle_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.detalle_compra_id_detalle_seq OWNED BY public.detalle_compra.id_detalle;
          public          postgres    false    221            �            1259    25487    imagen_producto    TABLE     �   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    nombre_imagen text,
    ruta_imagen text,
    codigo_producto integer
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    25492 
   metodopago    TABLE     �   CREATE TABLE public.metodopago (
    id_metodopago integer NOT NULL,
    nombre character varying(200),
    descripcion character varying(200)
);
    DROP TABLE public.metodopago;
       public         heap    postgres    false            �            1259    25495    metodopago_id_metodopago_seq    SEQUENCE     �   CREATE SEQUENCE public.metodopago_id_metodopago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.metodopago_id_metodopago_seq;
       public          postgres    false    223            S           0    0    metodopago_id_metodopago_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.metodopago_id_metodopago_seq OWNED BY public.metodopago.id_metodopago;
          public          postgres    false    224            �            1259    25496    pago    TABLE     �   CREATE TABLE public.pago (
    id_pago integer NOT NULL,
    total double precision,
    codigo_cliente integer,
    codigo_metodopago integer
);
    DROP TABLE public.pago;
       public         heap    postgres    false            �            1259    25499    pago_id_pago_seq    SEQUENCE     �   CREATE SEQUENCE public.pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pago_id_pago_seq;
       public          postgres    false    225            T           0    0    pago_id_pago_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pago_id_pago_seq OWNED BY public.pago.id_pago;
          public          postgres    false    226            �            1259    25572    pedido_producto    TABLE     w   CREATE TABLE public.pedido_producto (
    id_pedido integer,
    id_producto integer,
    cantidad_producto integer
);
 #   DROP TABLE public.pedido_producto;
       public         heap    postgres    false            �            1259    25500    producto    TABLE       CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(120),
    descripcion_producto character varying(255),
    stock integer,
    precio double precision,
    tipo character varying(100),
    color character varying(50)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    25505    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    227            U           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    228            �           2604    25506    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    215    214            �           2604    25507    comentario id_producto    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_producto SET DEFAULT nextval('public.comentario_id_producto_seq'::regclass);
 E   ALTER TABLE public.comentario ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    217    216            �           2604    25508    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    25509    detalle_compra id_detalle    DEFAULT     �   ALTER TABLE ONLY public.detalle_compra ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_compra_id_detalle_seq'::regclass);
 H   ALTER TABLE public.detalle_compra ALTER COLUMN id_detalle DROP DEFAULT;
       public          postgres    false    221    220            �           2604    25510    metodopago id_metodopago    DEFAULT     �   ALTER TABLE ONLY public.metodopago ALTER COLUMN id_metodopago SET DEFAULT nextval('public.metodopago_id_metodopago_seq'::regclass);
 G   ALTER TABLE public.metodopago ALTER COLUMN id_metodopago DROP DEFAULT;
       public          postgres    false    224    223            �           2604    25511    pago id_pago    DEFAULT     l   ALTER TABLE ONLY public.pago ALTER COLUMN id_pago SET DEFAULT nextval('public.pago_id_pago_seq'::regclass);
 ;   ALTER TABLE public.pago ALTER COLUMN id_pago DROP DEFAULT;
       public          postgres    false    226    225            �           2604    25512    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    228    227            9          0    25469    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena, tipo_de_documento, numero_de_documento) FROM stdin;
    public          postgres    false    214   eQ       ;          0    25475 
   comentario 
   TABLE DATA           [   COPY public.comentario (id_producto, texto, fecha_comentario, codigo_producto) FROM stdin;
    public          postgres    false    216   R       =          0    25479    compra 
   TABLE DATA           a   COPY public.compra (id_compra, fecha_compra, estado, codigo_cliente, detalle_compra) FROM stdin;
    public          postgres    false    218   (R       ?          0    25483    detalle_compra 
   TABLE DATA           u   COPY public.detalle_compra (id_detalle, fecha_pedido, direccion, estado_entrega, precio, codigo_cliente) FROM stdin;
    public          postgres    false    220   ER       A          0    25487    imagen_producto 
   TABLE DATA           a   COPY public.imagen_producto (id_imagen, nombre_imagen, ruta_imagen, codigo_producto) FROM stdin;
    public          postgres    false    222   �R       B          0    25492 
   metodopago 
   TABLE DATA           H   COPY public.metodopago (id_metodopago, nombre, descripcion) FROM stdin;
    public          postgres    false    223   PT       D          0    25496    pago 
   TABLE DATA           Q   COPY public.pago (id_pago, total, codigo_cliente, codigo_metodopago) FROM stdin;
    public          postgres    false    225   mT       H          0    25572    pedido_producto 
   TABLE DATA           T   COPY public.pedido_producto (id_pedido, id_producto, cantidad_producto) FROM stdin;
    public          postgres    false    229   �T       F          0    25500    producto 
   TABLE DATA           r   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock, precio, tipo, color) FROM stdin;
    public          postgres    false    227   �T       V           0    0    cliente_id_usuario_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 23, true);
          public          postgres    false    215            W           0    0    comentario_id_producto_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.comentario_id_producto_seq', 1, false);
          public          postgres    false    217            X           0    0    compra_id_compra_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.compra_id_compra_seq', 1, false);
          public          postgres    false    219            Y           0    0    detalle_compra_id_detalle_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.detalle_compra_id_detalle_seq', 3, true);
          public          postgres    false    221            Z           0    0    metodopago_id_metodopago_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.metodopago_id_metodopago_seq', 1, false);
          public          postgres    false    224            [           0    0    pago_id_pago_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pago_id_pago_seq', 1, false);
          public          postgres    false    226            \           0    0    producto_id_producto_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.producto_id_producto_seq', 5, true);
          public          postgres    false    228            �           2606    25514    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    25516    comentario comentario_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_producto);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    25518    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    25520 "   detalle_compra detalle_compra_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.detalle_compra
    ADD CONSTRAINT detalle_compra_pkey PRIMARY KEY (id_detalle);
 L   ALTER TABLE ONLY public.detalle_compra DROP CONSTRAINT detalle_compra_pkey;
       public            postgres    false    220            �           2606    25522 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    222            �           2606    25524    metodopago metodopago_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT metodopago_pkey PRIMARY KEY (id_metodopago);
 D   ALTER TABLE ONLY public.metodopago DROP CONSTRAINT metodopago_pkey;
       public            postgres    false    223            �           2606    25526    pago pago_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);
 8   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_pkey;
       public            postgres    false    225            �           2606    25528    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    227            �           2606    25529 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    216    3233    227            �           2606    25534 !   compra compra_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 K   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_codigo_cliente_fkey;
       public          postgres    false    214    3219    218            �           2606    25564 1   detalle_compra detalle_compra_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_compra
    ADD CONSTRAINT detalle_compra_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 [   ALTER TABLE ONLY public.detalle_compra DROP CONSTRAINT detalle_compra_codigo_cliente_fkey;
       public          postgres    false    214    3219    220            �           2606    25544    compra fk_detalle_compra    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT fk_detalle_compra FOREIGN KEY (detalle_compra) REFERENCES public.detalle_compra(id_detalle);
 B   ALTER TABLE ONLY public.compra DROP CONSTRAINT fk_detalle_compra;
       public          postgres    false    3225    218    220            �           2606    25549 4   imagen_producto imagen_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_codigo_producto_fkey;
       public          postgres    false    222    3233    227            �           2606    25554    pago pago_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 G   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_codigo_cliente_fkey;
       public          postgres    false    225    3219    214            �           2606    25559     pago pago_codigo_metodopago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_codigo_metodopago_fkey FOREIGN KEY (codigo_metodopago) REFERENCES public.pago(id_pago);
 J   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_codigo_metodopago_fkey;
       public          postgres    false    3231    225    225            �           2606    25575 .   pedido_producto pedido_producto_id_pedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido_producto
    ADD CONSTRAINT pedido_producto_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.detalle_compra(id_detalle);
 X   ALTER TABLE ONLY public.pedido_producto DROP CONSTRAINT pedido_producto_id_pedido_fkey;
       public          postgres    false    229    220    3225            �           2606    25580 0   pedido_producto pedido_producto_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido_producto
    ADD CONSTRAINT pedido_producto_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto);
 Z   ALTER TABLE ONLY public.pedido_producto DROP CONSTRAINT pedido_producto_id_producto_fkey;
       public          postgres    false    229    227    3233            9   �   x�e��
�0Dϛ���F{k���^��6�.$Z��k�����ٷ�n]Og?�1�):/���?����������6����	Z��G�Li
�n���}��E��Zz�clH6�Y��e��3���b�[��l0��Q~��B)�^�C      ;      x������ � �      =      x������ � �      ?   <   x�3�4202�5��5��tN��IUp�Qp�,MILQp�t�SHN����*� N#C�=... �m      A   �  x����n�0��3}
_�@?,�Q�3f&�d�]*V����O?�v#K5��x�����Rk)"m�d��R)�_����kٶ#>X�g>�-΅o��,��/x��G�G���x�M0ߥul��Ι�0�@0 ���D��3�6���)�G,_�	~��x�K������3<g��`�qJOe��*&�di.ي5/���F;���w/P�lRo�ޝM&Ӛ�Ʊ(9)�9�Y�bYBx/�.z��p��ێX���꘭ؖK,�i�j�+QD���
R��#��s��p�P�9^�w~Z{����)k'
�:��_�����6;S_�)5W�X��\���T��g��UEڀ�A�I�ip��=]�7W]��V�A����Aֆע����f�]�g2�*��$�7��ǣ��YR==C��y�|`r;�)��F}�0�r      B      x������ � �      D      x������ � �      H      x�3�4�4�b0i�i����� !��      F   z  x�uS�n�0����H�i�ft\'��El������e����2ݺ���(p
$�:޽{��I��̗��ie�5N"��h�X�	]|���x��}��Xl
!vQ)�/le�c_�Z��\0m8 Y���@��Q��FB�eO5�JК~R��D�F-tPv?�NΆ���P�R�2/e�|�!U-�"�t�x�n�(�Ս��O�v=*�G�US�::$����C���B��t���T�VC���l4D�e4Q5�AS�W�{����+� �s��l���O�ŷ��%M�w��Y�ڿ.�JS�(ƫӲ�s Z��a��x@��L�E���J�&��sS��آ�F�}l^����,ڐR$Vo�U:��`N�?>�]ϝ�j3�C۵�^�`KP�)Ζdǃ�����e��ͯ�o�}#`t�16��+:[���x p��}I��蔜������Ǡ� �P�����#��QTx�d���P�>j~�M�/o>O��:$����`ה5�l���[qjl�Ş�=�7K��_&������vڵ��u�>������d<��g�Ʒ�l����h��+&�� �?˘��$��7A�������40M?7�j����0�;���gur^��&���<���D�     