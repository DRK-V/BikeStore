PGDMP     9    )                {         
   bikestore2    15.3    15.3 P    \           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ]           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ^           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            _           1262    16397 
   bikestore2    DATABASE     }   CREATE DATABASE bikestore2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE bikestore2;
                postgres    false            �            1259    16398    cliente    TABLE     �  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_usuario character varying(55) NOT NULL,
    rol_usuario character varying(20) NOT NULL,
    direccion character varying(100),
    correo character varying(70),
    telefono integer,
    contrasena character varying(100),
    tipo_de_documento character varying(100),
    numero_de_documento character varying(100),
    imagen_usuario character varying(100)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    16403    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            `           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    215            �            1259    16404 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_comentario integer NOT NULL,
    texto character varying(255),
    codigo_producto integer,
    codigo_cliente integer,
    fecha_creacion date DEFAULT CURRENT_DATE
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    16408    comentario_id_comentario_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_comentario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.comentario_id_comentario_seq;
       public          postgres    false    216            a           0    0    comentario_id_comentario_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.comentario_id_comentario_seq OWNED BY public.comentario.id_comentario;
          public          postgres    false    217            �            1259    16409    compra    TABLE     %  CREATE TABLE public.compra (
    id_compra integer NOT NULL,
    fecha_compra date,
    monto_final double precision,
    estado character varying(10),
    direccion character varying(100),
    codigo_administrador integer,
    color character varying(50),
    texto character varying(255)
);
    DROP TABLE public.compra;
       public         heap    postgres    false            �            1259    16412    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            b           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    16413    compra_producto    TABLE     �   CREATE TABLE public.compra_producto (
    id_compra_producto integer NOT NULL,
    codigo_producto integer,
    codigo_compra integer
);
 #   DROP TABLE public.compra_producto;
       public         heap    postgres    false            �            1259    16416 &   compra_producto_id_compra_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_producto_id_compra_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.compra_producto_id_compra_producto_seq;
       public          postgres    false    220            c           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.compra_producto_id_compra_producto_seq OWNED BY public.compra_producto.id_compra_producto;
          public          postgres    false    221            �            1259    16417    imagen_producto    TABLE     �   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    ruta_imagen character varying(255),
    nombre_imagen character varying(45),
    codigo_producto integer
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    16420    imagen_producto_id_imagen_seq    SEQUENCE     �   CREATE SEQUENCE public.imagen_producto_id_imagen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.imagen_producto_id_imagen_seq;
       public          postgres    false    222            d           0    0    imagen_producto_id_imagen_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.imagen_producto_id_imagen_seq OWNED BY public.imagen_producto.id_imagen;
          public          postgres    false    223            �            1259    16421    producto    TABLE       CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(120),
    descripcion_producto character varying(255),
    stock_disponible integer,
    tipo character varying(100),
    color character varying(50),
    precio numeric(10,2)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    16426    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    224            e           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    225            �            1259    16427    stock    TABLE     
  CREATE TABLE public.stock (
    codigo_stock_producto integer,
    cantidad_minima_stock integer,
    fecha_registro date,
    tipo_actualizacion character varying(100),
    cantidad_agregada integer,
    cantidad_retirada integer,
    codigo_responsable integer
);
    DROP TABLE public.stock;
       public         heap    postgres    false            �            1259    16430    stock_producto    TABLE     3  CREATE TABLE public.stock_producto (
    id_stock_producto integer NOT NULL,
    codigo_producto integer,
    nombre_producto character varying(100),
    cantidad_producto integer,
    precio_unitario double precision,
    color character varying(50),
    codigo_compra integer,
    codigo_venta integer
);
 "   DROP TABLE public.stock_producto;
       public         heap    postgres    false            �            1259    16433 $   stock_producto_id_stock_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_producto_id_stock_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.stock_producto_id_stock_producto_seq;
       public          postgres    false    227            f           0    0 $   stock_producto_id_stock_producto_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.stock_producto_id_stock_producto_seq OWNED BY public.stock_producto.id_stock_producto;
          public          postgres    false    228            �            1259    16434    venta    TABLE     v  CREATE TABLE public.venta (
    id_venta integer NOT NULL,
    estado_venta character varying(100),
    descuento double precision,
    codigo_cliente integer,
    monto_final double precision,
    tipo_de_cuenta character varying(50),
    banco character varying(50),
    numero_de_cuenta character varying(50),
    fecha_venta timestamp without time zone DEFAULT now()
);
    DROP TABLE public.venta;
       public         heap    postgres    false            �            1259    16437    venta_id_venta_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_id_venta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.venta_id_venta_seq;
       public          postgres    false    229            g           0    0    venta_id_venta_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.venta_id_venta_seq OWNED BY public.venta.id_venta;
          public          postgres    false    230            �            1259    16438    venta_producto    TABLE     �   CREATE TABLE public.venta_producto (
    id_venta_producto integer NOT NULL,
    codigo_venta integer,
    codigo_producto integer,
    cantidad_producto integer
);
 "   DROP TABLE public.venta_producto;
       public         heap    postgres    false            �            1259    16441 $   venta_producto_id_venta_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_producto_id_venta_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.venta_producto_id_venta_producto_seq;
       public          postgres    false    231            h           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.venta_producto_id_venta_producto_seq OWNED BY public.venta_producto.id_venta_producto;
          public          postgres    false    232            �           2604    16442    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    215    214            �           2604    16443    comentario id_comentario    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_comentario SET DEFAULT nextval('public.comentario_id_comentario_seq'::regclass);
 G   ALTER TABLE public.comentario ALTER COLUMN id_comentario DROP DEFAULT;
       public          postgres    false    217    216            �           2604    16444    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    16445 "   compra_producto id_compra_producto    DEFAULT     �   ALTER TABLE ONLY public.compra_producto ALTER COLUMN id_compra_producto SET DEFAULT nextval('public.compra_producto_id_compra_producto_seq'::regclass);
 Q   ALTER TABLE public.compra_producto ALTER COLUMN id_compra_producto DROP DEFAULT;
       public          postgres    false    221    220            �           2604    16446    imagen_producto id_imagen    DEFAULT     �   ALTER TABLE ONLY public.imagen_producto ALTER COLUMN id_imagen SET DEFAULT nextval('public.imagen_producto_id_imagen_seq'::regclass);
 H   ALTER TABLE public.imagen_producto ALTER COLUMN id_imagen DROP DEFAULT;
       public          postgres    false    223    222            �           2604    16447    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    225    224            �           2604    16448     stock_producto id_stock_producto    DEFAULT     �   ALTER TABLE ONLY public.stock_producto ALTER COLUMN id_stock_producto SET DEFAULT nextval('public.stock_producto_id_stock_producto_seq'::regclass);
 O   ALTER TABLE public.stock_producto ALTER COLUMN id_stock_producto DROP DEFAULT;
       public          postgres    false    228    227            �           2604    16449    venta id_venta    DEFAULT     p   ALTER TABLE ONLY public.venta ALTER COLUMN id_venta SET DEFAULT nextval('public.venta_id_venta_seq'::regclass);
 =   ALTER TABLE public.venta ALTER COLUMN id_venta DROP DEFAULT;
       public          postgres    false    230    229            �           2604    16450     venta_producto id_venta_producto    DEFAULT     �   ALTER TABLE ONLY public.venta_producto ALTER COLUMN id_venta_producto SET DEFAULT nextval('public.venta_producto_id_venta_producto_seq'::regclass);
 O   ALTER TABLE public.venta_producto ALTER COLUMN id_venta_producto DROP DEFAULT;
       public          postgres    false    232    231            G          0    16398    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena, tipo_de_documento, numero_de_documento, imagen_usuario) FROM stdin;
    public          postgres    false    214   h       I          0    16404 
   comentario 
   TABLE DATA           k   COPY public.comentario (id_comentario, texto, codigo_producto, codigo_cliente, fecha_creacion) FROM stdin;
    public          postgres    false    216   �h       K          0    16409    compra 
   TABLE DATA           }   COPY public.compra (id_compra, fecha_compra, monto_final, estado, direccion, codigo_administrador, color, texto) FROM stdin;
    public          postgres    false    218   i       M          0    16413    compra_producto 
   TABLE DATA           ]   COPY public.compra_producto (id_compra_producto, codigo_producto, codigo_compra) FROM stdin;
    public          postgres    false    220   ,i       O          0    16417    imagen_producto 
   TABLE DATA           a   COPY public.imagen_producto (id_imagen, ruta_imagen, nombre_imagen, codigo_producto) FROM stdin;
    public          postgres    false    222   Ii       Q          0    16421    producto 
   TABLE DATA           }   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock_disponible, tipo, color, precio) FROM stdin;
    public          postgres    false    224   �n       S          0    16427    stock 
   TABLE DATA           �   COPY public.stock (codigo_stock_producto, cantidad_minima_stock, fecha_registro, tipo_actualizacion, cantidad_agregada, cantidad_retirada, codigo_responsable) FROM stdin;
    public          postgres    false    226   �u       T          0    16430    stock_producto 
   TABLE DATA           �   COPY public.stock_producto (id_stock_producto, codigo_producto, nombre_producto, cantidad_producto, precio_unitario, color, codigo_compra, codigo_venta) FROM stdin;
    public          postgres    false    227   �u       V          0    16434    venta 
   TABLE DATA           �   COPY public.venta (id_venta, estado_venta, descuento, codigo_cliente, monto_final, tipo_de_cuenta, banco, numero_de_cuenta, fecha_venta) FROM stdin;
    public          postgres    false    229   v       X          0    16438    venta_producto 
   TABLE DATA           m   COPY public.venta_producto (id_venta_producto, codigo_venta, codigo_producto, cantidad_producto) FROM stdin;
    public          postgres    false    231   w       i           0    0    cliente_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 3, true);
          public          postgres    false    215            j           0    0    comentario_id_comentario_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.comentario_id_comentario_seq', 19, true);
          public          postgres    false    217            k           0    0    compra_id_compra_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.compra_id_compra_seq', 1, false);
          public          postgres    false    219            l           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.compra_producto_id_compra_producto_seq', 1, false);
          public          postgres    false    221            m           0    0    imagen_producto_id_imagen_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.imagen_producto_id_imagen_seq', 1, false);
          public          postgres    false    223            n           0    0    producto_id_producto_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.producto_id_producto_seq', 3, true);
          public          postgres    false    225            o           0    0 $   stock_producto_id_stock_producto_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.stock_producto_id_stock_producto_seq', 1, false);
          public          postgres    false    228            p           0    0    venta_id_venta_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.venta_id_venta_seq', 15, true);
          public          postgres    false    230            q           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.venta_producto_id_venta_producto_seq', 12, true);
          public          postgres    false    232            �           2606    16452    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    16454    comentario comentario_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_comentario);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    16456    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    16458 $   compra_producto compra_producto_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_pkey PRIMARY KEY (id_compra_producto);
 N   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_pkey;
       public            postgres    false    220            �           2606    16460 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    222            �           2606    16462    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    224            �           2606    16464 "   stock_producto stock_producto_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_pkey PRIMARY KEY (id_stock_producto);
 L   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_pkey;
       public            postgres    false    227            �           2606    16466    venta venta_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (id_venta);
 :   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_pkey;
       public            postgres    false    229            �           2606    16468 "   venta_producto venta_producto_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_pkey PRIMARY KEY (id_venta_producto);
 L   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_pkey;
       public            postgres    false    231            �           2606    16469 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    216    3239    224            �           2606    16474 2   compra_producto compra_producto_codigo_compra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_compra_fkey FOREIGN KEY (codigo_compra) REFERENCES public.compra(id_compra);
 \   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_compra_fkey;
       public          postgres    false    218    220    3233            �           2606    16479 4   compra_producto compra_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_producto_fkey;
       public          postgres    false    3239    220    224            �           2606    16484    comentario fk_codigo_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk_codigo_cliente FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 F   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fk_codigo_cliente;
       public          postgres    false    3229    214    216            �           2606    16489 4   imagen_producto imagen_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_codigo_producto_fkey;
       public          postgres    false    224    222    3239            �           2606    16494 &   stock stock_codigo_stock_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_codigo_stock_producto_fkey FOREIGN KEY (codigo_stock_producto) REFERENCES public.stock_producto(id_stock_producto);
 P   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_codigo_stock_producto_fkey;
       public          postgres    false    226    3241    227            �           2606    16499 0   stock_producto stock_producto_codigo_compra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_codigo_compra_fkey FOREIGN KEY (codigo_compra) REFERENCES public.compra(id_compra);
 Z   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_codigo_compra_fkey;
       public          postgres    false    227    3233    218            �           2606    16504 /   stock_producto stock_producto_codigo_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_codigo_venta_fkey FOREIGN KEY (codigo_venta) REFERENCES public.venta(id_venta);
 Y   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_codigo_venta_fkey;
       public          postgres    false    227    229    3243            �           2606    16509    venta venta_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 I   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_codigo_cliente_fkey;
       public          postgres    false    229    3229    214            �           2606    16514 2   venta_producto venta_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 \   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_producto_fkey;
       public          postgres    false    224    3239    231            �           2606    16519 /   venta_producto venta_producto_codigo_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_venta_fkey FOREIGN KEY (codigo_venta) REFERENCES public.venta(id_venta);
 Y   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_venta_fkey;
       public          postgres    false    231    3243    229            G   �   x�U�K�0D��)8AK���!�5'�TYi(AI]%��@���=֌�$4Y� �D�2t�E9����4{�
���p<m�x����RM�	�i_f�hvh�_�L��@�]ߙ���(%��Q��,.s��u���F�M�U�)���<
��ظb����!#d�5��U(
AW	!�P�Q�      I   ,   x�3��L��4�4�4202�5��54�2���42A3����� ��{      K      x������ � �      M      x������ � �      O   w  x����v�6���S�Lr@��˙�O�M���]t�	�0!�cO�7�s���J���b069'���HW�t�87��]�m����4N�,)#k�e	?�,��}�>�{�~�_f_v��}k�򢌞���a��Q��t��sꉚ� =o��[�sA���)�����d�?`��j���ղ��l�	�|���sa���Oe�`��Js4�-���<���k�hnAùZõ���7���z���隆E�5�\Z��b�o��wIq�߬�1�@٭ceC�������KͲ��B��� ��l$v	���H8l"�&�5<��\�����٤IY����ȭG���~�#ɡ(�v|W伄v��4f�ǜ�tD-�<&�	a8� �aK�N_�!zoLg��U�B60������dh�����#�|���|�$w���s�ViZ
?���rl�Ƌ/=���C��)ɟ���S���3A;̴�h�Q��3qxZ 
ڏ&��"D�bE6��BN�J���������H��{٪ʿ������IZ����b<=���-~s�/IQAn�ɦ��g��;��p��m�����9I2+����:��!�+q$l�����
�)�}+K%��3�n�,_l�Ҏ47W�KY�n�r�G(m(C9a��*��#���C�\�-�쮎��A�^���(	i_��p�	��0|\�B)J[��W���-�b�SO3�9�3���9hOr�P��G�xF a(j�#<!�02
���.��ğ���(�j�chV'ee.�E�X���m���lc@���S"���(�&YGҷ]�Iq[�_Ж��<9}��qN@���<��@�8�=��V0k��X�%`�頠O��C���|����;B���0��`L�� ��-0�J���U�e���N��9�M��PO�L��9�7���1Msx�ѾQ/�@n����s�$��WsY/��>��rq#���9m(���Q|��L�w�~|��L���q�&G�􊨠��JH�~��,���h�u��>T�����y�;�IC�-��v�2mT�cD��:fڨ���p]�ŉ�-�KA_��Cā�����t;����{���e�4Qh��4x�x[��P�M��/So���x��"R|y�VII�u��ԩ:��\�_6�}6��t���P����k�<�2��a�ࣔ�!tx�����Q�-س�/�aA�w�n ������zhc���ꡍ�������v�����<�:q}�A�`W�j������6Ƞ�v�s�bXrX'i��!�Z�]h	��mWAC����u��Õ���Ky���_Y�qd�R��1�*�v����c8�.|�� {]N�E��Bz����Sȴ�O��i���-��3c�}�d.      Q   �  x��X�r�6=�_���[#�qOO��6�i���N{�� 	� �Z�{ȡ�[�Տ�- � %��[}�" ��}�v���R	%��8�	[U�ϵd��ُ��=d�d��l�}��V�XH�ue��f�VJ\/T)��gw8�)���il���c�K��LVb�t�dVI��pYم�7#�}�)[YSq��;�M���7���(e6���ڰ�=���B��_����:����y]
�qt@��^�%��7�pVʲ�lU��8TX�riW�r�/���Rk�W����`��F}��݇��\s#`�5�4���jY�+��8���Y�{�����i�-���+��dN%�������%�	�i|�f55_8�ٖ�l�²r�Zxc�2� ��%�ѫ��#�U�<9�p�d9�f*�*�j^��R��os*G�)�r����Z����l��"���<WpRUՈ��=��ٯ��I`��%°�bv`�W2�e�=p� �	�u�����*�	�EV� �k(�;��:s���f�ͼ>��ϒ������KG��ʎ��&�������P��q��:�M0����)�ٽl�.d�1��g�Ik����+n�E�"�g5"V�@�H�7�l2>ˮ(�q&"�l�K'E���֭ihD�lNn�����1C���.jp1�h�J�o���8R���^��{X³������sEH(1�>I� ш���|&,v���9肔?�eP��T	��i�G����Z���j�-���'�.���eLjF�UYq���4o��i�v��$�i�Z|�r��\��G���i��w��9�`�c��XZ@s%_*���5��%o6�J���Q��A��B&�6���������BB�F��uY2?��l�o�Y��z���!�����9n���p�`ż
���Ky�A�]Sސ��.�}@�Se69��LҺ�����b���`�#��V*V~�:��*��[KZ���>�H���r괃<}2��ê�-�T:<Y���鶐0H(Ʒ�V�)a�����ʬ!n*�%p!�)�P��'��ms��26'��(�W�z��D�S�����>����c��Yz'�ݞ��`�;�4��}[݄u͝��"��~ٯ�H�ri��ګ+�-
�}AR��m���R
o�|n[�@y/����*/Mc�B�����*2�4����n"�'�E���W_Sۣ��� ���3 ��.��'|�Y����uL���H�t�c��TQ�M�T<���-kC�\Sk��,09?��`~��{{ۤ��Qo��[d���I9�}G'S�Cˀ�7v!�|ic+��@����h�f{��uE�n���m_ww`cS�yQFG/�c���/�� QE��`�@�P���� �A�֌?	��C����K�Xr�$������b���f�%��<����k�B��/#�0lƭ�.�������!6�$�ޭ>=����M�+�cqo����LB�*�?�-�	��F��*bcrh�1�Y�4�37f���]w7�?�������كE|���a��7��¼���t@��Z�j��K>��)�����s�2�&;�r�����D�Ci��Υ���Wt�㯡�剠B�6��a��`]�>��n"fz5���4m���!� �%�P k��m=�7/5��L˙B�,h����y@>�#-�9���Y��i'3͋VZ	�?�m��_t�UI&�.nq��8z�O�� �kl0�bWIB	_�ڏ���ۉ��m���^�R�u
�,���z��GGGG�@G�c      S      x������ � �      T      x������ � �      V   �   x���]j�0���S����w���/%N 0�A���W�Z֬�Kg����m��G?���>{G��6t��K0���^�+c�Q��zv�8��ӡ�g�䯼��� ����ᇲ8�����G��ąc�{D����'�h�jtY�C��Ā8�'\3�S'r�i���<�fM�F�Ȩ�o�b� %�ѓ,����/AB�)FN������KZI 	�tm=]�f����;�T&�h����賬�      X   1   x�3�4�4�4� �F��\� �74 R� �!��\�F`�W� ���     