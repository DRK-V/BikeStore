PGDMP         2                {         
   bikestore2    15.3    15.3 O    Y           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Z           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            [           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            \           1262    50279 
   bikestore2    DATABASE     }   CREATE DATABASE bikestore2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE bikestore2;
                postgres    false            �            1259    50280    cliente    TABLE     �  CREATE TABLE public.cliente (
    id_usuario integer NOT NULL,
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
       public         heap    postgres    false            �            1259    50285    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            ]           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_usuario;
          public          postgres    false    215            �            1259    50286 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_comentario integer NOT NULL,
    texto character varying(255),
    fecha_comentario date,
    codigo_producto integer
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    50289    comentario_id_comentario_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_comentario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.comentario_id_comentario_seq;
       public          postgres    false    216            ^           0    0    comentario_id_comentario_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.comentario_id_comentario_seq OWNED BY public.comentario.id_comentario;
          public          postgres    false    217            �            1259    50290    compra    TABLE     %  CREATE TABLE public.compra (
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
       public         heap    postgres    false            �            1259    50293    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            _           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    50294    compra_producto    TABLE     �   CREATE TABLE public.compra_producto (
    id_compra_producto integer NOT NULL,
    codigo_producto integer,
    codigo_compra integer
);
 #   DROP TABLE public.compra_producto;
       public         heap    postgres    false            �            1259    50297 &   compra_producto_id_compra_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_producto_id_compra_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.compra_producto_id_compra_producto_seq;
       public          postgres    false    220            `           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.compra_producto_id_compra_producto_seq OWNED BY public.compra_producto.id_compra_producto;
          public          postgres    false    221            �            1259    50298    imagen_producto    TABLE     �   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    ruta_imagen character varying(255),
    nombre_imagen character varying(45),
    codigo_producto integer
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    50301    imagen_producto_id_imagen_seq    SEQUENCE     �   CREATE SEQUENCE public.imagen_producto_id_imagen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.imagen_producto_id_imagen_seq;
       public          postgres    false    222            a           0    0    imagen_producto_id_imagen_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.imagen_producto_id_imagen_seq OWNED BY public.imagen_producto.id_imagen;
          public          postgres    false    223            �            1259    50302    producto    TABLE       CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(120),
    descripcion_producto character varying(255),
    stock_disponible integer,
    precio double precision,
    tipo character varying(100),
    color character varying(50)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    50307    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    224            b           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    225            �            1259    50308    stock    TABLE     
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
       public         heap    postgres    false            �            1259    50311    stock_producto    TABLE     3  CREATE TABLE public.stock_producto (
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
       public         heap    postgres    false            �            1259    50314 $   stock_producto_id_stock_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_producto_id_stock_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.stock_producto_id_stock_producto_seq;
       public          postgres    false    227            c           0    0 $   stock_producto_id_stock_producto_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.stock_producto_id_stock_producto_seq OWNED BY public.stock_producto.id_stock_producto;
          public          postgres    false    228            �            1259    50315    venta    TABLE     �   CREATE TABLE public.venta (
    id_venta integer NOT NULL,
    fecha_venta date,
    estado_venta character varying(100),
    descuento double precision,
    codigo_cliente integer
);
    DROP TABLE public.venta;
       public         heap    postgres    false            �            1259    50318    venta_id_venta_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_id_venta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.venta_id_venta_seq;
       public          postgres    false    229            d           0    0    venta_id_venta_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.venta_id_venta_seq OWNED BY public.venta.id_venta;
          public          postgres    false    230            �            1259    50319    venta_producto    TABLE     �   CREATE TABLE public.venta_producto (
    id_venta_producto integer NOT NULL,
    codigo_venta integer,
    codigo_producto integer
);
 "   DROP TABLE public.venta_producto;
       public         heap    postgres    false            �            1259    50322 $   venta_producto_id_venta_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_producto_id_venta_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.venta_producto_id_venta_producto_seq;
       public          postgres    false    231            e           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.venta_producto_id_venta_producto_seq OWNED BY public.venta_producto.id_venta_producto;
          public          postgres    false    232            �           2604    50323    cliente id_usuario    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_usuario SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    215    214            �           2604    50324    comentario id_comentario    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_comentario SET DEFAULT nextval('public.comentario_id_comentario_seq'::regclass);
 G   ALTER TABLE public.comentario ALTER COLUMN id_comentario DROP DEFAULT;
       public          postgres    false    217    216            �           2604    50325    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    50326 "   compra_producto id_compra_producto    DEFAULT     �   ALTER TABLE ONLY public.compra_producto ALTER COLUMN id_compra_producto SET DEFAULT nextval('public.compra_producto_id_compra_producto_seq'::regclass);
 Q   ALTER TABLE public.compra_producto ALTER COLUMN id_compra_producto DROP DEFAULT;
       public          postgres    false    221    220            �           2604    50327    imagen_producto id_imagen    DEFAULT     �   ALTER TABLE ONLY public.imagen_producto ALTER COLUMN id_imagen SET DEFAULT nextval('public.imagen_producto_id_imagen_seq'::regclass);
 H   ALTER TABLE public.imagen_producto ALTER COLUMN id_imagen DROP DEFAULT;
       public          postgres    false    223    222            �           2604    50328    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    225    224            �           2604    50329     stock_producto id_stock_producto    DEFAULT     �   ALTER TABLE ONLY public.stock_producto ALTER COLUMN id_stock_producto SET DEFAULT nextval('public.stock_producto_id_stock_producto_seq'::regclass);
 O   ALTER TABLE public.stock_producto ALTER COLUMN id_stock_producto DROP DEFAULT;
       public          postgres    false    228    227            �           2604    50330    venta id_venta    DEFAULT     p   ALTER TABLE ONLY public.venta ALTER COLUMN id_venta SET DEFAULT nextval('public.venta_id_venta_seq'::regclass);
 =   ALTER TABLE public.venta ALTER COLUMN id_venta DROP DEFAULT;
       public          postgres    false    230    229            �           2604    50331     venta_producto id_venta_producto    DEFAULT     �   ALTER TABLE ONLY public.venta_producto ALTER COLUMN id_venta_producto SET DEFAULT nextval('public.venta_producto_id_venta_producto_seq'::regclass);
 O   ALTER TABLE public.venta_producto ALTER COLUMN id_venta_producto DROP DEFAULT;
       public          postgres    false    232    231            D          0    50280    cliente 
   TABLE DATA           �   COPY public.cliente (id_usuario, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena, tipo_de_documento, numero_de_documento, imagen_usuario) FROM stdin;
    public          postgres    false    214   .e       F          0    50286 
   comentario 
   TABLE DATA           ]   COPY public.comentario (id_comentario, texto, fecha_comentario, codigo_producto) FROM stdin;
    public          postgres    false    216   Ke       H          0    50290    compra 
   TABLE DATA           }   COPY public.compra (id_compra, fecha_compra, monto_final, estado, direccion, codigo_administrador, color, texto) FROM stdin;
    public          postgres    false    218   he       J          0    50294    compra_producto 
   TABLE DATA           ]   COPY public.compra_producto (id_compra_producto, codigo_producto, codigo_compra) FROM stdin;
    public          postgres    false    220   �e       L          0    50298    imagen_producto 
   TABLE DATA           a   COPY public.imagen_producto (id_imagen, ruta_imagen, nombre_imagen, codigo_producto) FROM stdin;
    public          postgres    false    222   �e       N          0    50302    producto 
   TABLE DATA           }   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock_disponible, precio, tipo, color) FROM stdin;
    public          postgres    false    224   )k       P          0    50308    stock 
   TABLE DATA           �   COPY public.stock (codigo_stock_producto, cantidad_minima_stock, fecha_registro, tipo_actualizacion, cantidad_agregada, cantidad_retirada, codigo_responsable) FROM stdin;
    public          postgres    false    226   5r       Q          0    50311    stock_producto 
   TABLE DATA           �   COPY public.stock_producto (id_stock_producto, codigo_producto, nombre_producto, cantidad_producto, precio_unitario, color, codigo_compra, codigo_venta) FROM stdin;
    public          postgres    false    227   Rr       S          0    50315    venta 
   TABLE DATA           _   COPY public.venta (id_venta, fecha_venta, estado_venta, descuento, codigo_cliente) FROM stdin;
    public          postgres    false    229   or       U          0    50319    venta_producto 
   TABLE DATA           Z   COPY public.venta_producto (id_venta_producto, codigo_venta, codigo_producto) FROM stdin;
    public          postgres    false    231   �r       f           0    0    cliente_id_usuario_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 1, false);
          public          postgres    false    215            g           0    0    comentario_id_comentario_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.comentario_id_comentario_seq', 1, false);
          public          postgres    false    217            h           0    0    compra_id_compra_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.compra_id_compra_seq', 1, false);
          public          postgres    false    219            i           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.compra_producto_id_compra_producto_seq', 1, false);
          public          postgres    false    221            j           0    0    imagen_producto_id_imagen_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.imagen_producto_id_imagen_seq', 1, false);
          public          postgres    false    223            k           0    0    producto_id_producto_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.producto_id_producto_seq', 3, true);
          public          postgres    false    225            l           0    0 $   stock_producto_id_stock_producto_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.stock_producto_id_stock_producto_seq', 1, false);
          public          postgres    false    228            m           0    0    venta_id_venta_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.venta_id_venta_seq', 1, false);
          public          postgres    false    230            n           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.venta_producto_id_venta_producto_seq', 1, false);
          public          postgres    false    232            �           2606    50333    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_usuario);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    50335    comentario comentario_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_comentario);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    50337    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    50339 $   compra_producto compra_producto_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_pkey PRIMARY KEY (id_compra_producto);
 N   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_pkey;
       public            postgres    false    220            �           2606    50341 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    222            �           2606    50343    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    224            �           2606    50345 "   stock_producto stock_producto_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_pkey PRIMARY KEY (id_stock_producto);
 L   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_pkey;
       public            postgres    false    227            �           2606    50347    venta venta_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (id_venta);
 :   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_pkey;
       public            postgres    false    229            �           2606    50349 "   venta_producto venta_producto_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_pkey PRIMARY KEY (id_venta_producto);
 L   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_pkey;
       public            postgres    false    231            �           2606    50350 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    216    3237    224            �           2606    50355 2   compra_producto compra_producto_codigo_compra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_compra_fkey FOREIGN KEY (codigo_compra) REFERENCES public.compra(id_compra);
 \   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_compra_fkey;
       public          postgres    false    3231    220    218            �           2606    50360 4   compra_producto compra_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_producto_fkey;
       public          postgres    false    3237    220    224            �           2606    50365 4   imagen_producto imagen_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_codigo_producto_fkey;
       public          postgres    false    3237    222    224            �           2606    50370 &   stock stock_codigo_stock_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_codigo_stock_producto_fkey FOREIGN KEY (codigo_stock_producto) REFERENCES public.stock_producto(id_stock_producto);
 P   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_codigo_stock_producto_fkey;
       public          postgres    false    3239    226    227            �           2606    50375 0   stock_producto stock_producto_codigo_compra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_codigo_compra_fkey FOREIGN KEY (codigo_compra) REFERENCES public.compra(id_compra);
 Z   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_codigo_compra_fkey;
       public          postgres    false    3231    227    218            �           2606    50380 /   stock_producto stock_producto_codigo_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_codigo_venta_fkey FOREIGN KEY (codigo_venta) REFERENCES public.venta(id_venta);
 Y   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_codigo_venta_fkey;
       public          postgres    false    229    3241    227            �           2606    50385    venta venta_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_usuario);
 I   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_codigo_cliente_fkey;
       public          postgres    false    3227    229    214            �           2606    50390 2   venta_producto venta_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 \   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_producto_fkey;
       public          postgres    false    3237    224    231            �           2606    50395 /   venta_producto venta_producto_codigo_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_venta_fkey FOREIGN KEY (codigo_venta) REFERENCES public.venta(id_venta);
 Y   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_venta_fkey;
       public          postgres    false    229    231    3241            D      x������ � �      F      x������ � �      H      x������ � �      J      x������ � �      L   w  x����v�6���S�Lr@��˙�O�M���]t�	�0!�cO�7�s���J���b069'���HW�t�87��]�m����4N�,)#k�e	?�,��}�>�{�~�_f_v��}k�򢌞���a��Q��t��sꉚ� =o��[�sA���)�����d�?`��j���ղ��l�	�|���sa���Oe�`��Js4�-���<���k�hnAùZõ���7���z���隆E�5�\Z��b�o��wIq�߬�1�@٭ceC�������KͲ��B��� ��l$v	���H8l"�&�5<��\�����٤IY����ȭG���~�#ɡ(�v|W伄v��4f�ǜ�tD-�<&�	a8� �aK�N_�!zoLg��U�B60������dh�����#�|���|�$w���s�ViZ
?���rl�Ƌ/=���C��)ɟ���S���3A;̴�h�Q��3qxZ 
ڏ&��"D�bE6��BN�J���������H��{٪ʿ������IZ����b<=���-~s�/IQAn�ɦ��g��;��p��m�����9I2+����:��!�+q$l�����
�)�}+K%��3�n�,_l�Ҏ47W�KY�n�r�G(m(C9a��*��#���C�\�-�쮎��A�^���(	i_��p�	��0|\�B)J[��W���-�b�SO3�9�3���9hOr�P��G�xF a(j�#<!�02
���.��ğ���(�j�chV'ee.�E�X���m���lc@���S"���(�&YGҷ]�Iq[�_Ж��<9}��qN@���<��@�8�=��V0k��X�%`�頠O��C���|����;B���0��`L�� ��-0�J���U�e���N��9�M��PO�L��9�7���1Msx�ѾQ/�@n����s�$��WsY/��>��rq#���9m(���Q|��L�w�~|��L���q�&G�􊨠��JH�~��,���h�u��>T�����y�;�IC�-��v�2mT�cD��:fڨ���p]�ŉ�-�KA_��Cā�����t;����{���e�4Qh��4x�x[��P�M��/So���x��"R|y�VII�u��ԩ:��\�_6�}6��t���P����k�<�2��a�ࣔ�!tx�����Q�-س�/�aA�w�n ������zhc���ꡍ�������v�����<�:q}�A�`W�j������6Ƞ�v�s�bXrX'i��!�Z�]h	��mWAC����u��Õ���Ky���_Y�qd�R��1�*�v����c8�.|�� {]N�E��Bz����Sȴ�O��i���-��3c�}�d.      N   �  x��X=s7��_�tɌ�!)K�&�%+qf��#)�n� x��#�ߨL�"�.e�����>Hʓ.*4w< �o���ݛ.��Ҩ�ĭte��d��x9�Hbv�P��,����J�b���	��\/�����Bm��9��<�����m��B=��c��$��*�
���8����t3�?&�c�,�-	��ʼN�]��-��UV\�����Ro��B��h,��fU!)�hP����K��o�qV��TbY�18T:+2喪��ό<w��+���J�;^��O�6X<�_�z���`f�J7<i��w�(��~��OV�����d`���mJ�tlK��u�e�͍��I���.��JȊ�ޥ�q�c �'6�(}���R��H/�E��B������'I9���{|�D��R?FoJ����� �P�ۼ��G���Ly�H����蟭�)�/Z.z�e*�
�yPw�ӱ��.zD��B vV�������Q@��/	�^1��������G�c	��̨ļq�3�Rf��G7<��x}<ӟ������W�T������f�&�ȼ��N�9�SD���p_�x���Yz-�;��%C'�aS�ة4<k|E�:d$2��B�
Y���ZRLƧ�+�`������W�C@��V0D�@I�6��>x�H GDQ�(�r�ʐc��bx����ހ����A���_e�ap&�8��� T"�W�����w@CX�?�%N����!M���U`z���e������2�g�o�+��2�W뢤���n����m,�����{�3��=�'�G'��i�����fm��gy*!�6KP(	����Y�Ɩ�kLE ����ZT��LV#{p�c)a-�2��x$)W�����&�������>cS�6��Qj��B������7G5��j�1��K�I�om:�QHW�+,���8�9�ɼ.��I����x�䧦�l�`����?3�-MaE���H%T�ícq0U�'bpW��ɾ<�L����a����Y.��"�n�|�+XcQ8�[�&��p�id0�ZmW�2��:7WŜu�����c|[�@IL�G�)jfϏ�(R�x�7�';kH�wO��?O��f潒�{�k9��ά
�uTM�y�Ddu��U�~�E��޴NWd��CΪ�<�����Ǘ!�]p�z�ʄ,�{<����$ 0l/#A�q�EfFY@��/$�u4�p%NN;E�mx����1 g_�>2)>!I�����9�kϮ#Χ�C�F]K� ���;g>����k��,_������~r~�o�<������i-��R=�����W����Ulk����/��J�X��I��("o^>�|��i�~6%w;��v��}�ہ�u��
��&]vg��Xy*���p�|�<-��X���)���K�����<sCR�8>iX���8	�Va�k/Q�oI���P|�Dlȿ	�b�ƴ�˩Ը'���C&�{X��n������m\Z0s>��m��֓FlC�Gm�{�� -�~Ǉ�7��_�S?��lM��]����y.؛��Lw����N�;xJ(l[�oϙ�j�b2zA3���r�C��T(�����J��/T�!1� ���3~~|�MkHmq,����~�Ar�+��1(�M+��G���P��h�ن��Qg.a��x�V�����!���\ht���^�nɛ��9���;���s+u|k(ߪ(���iۍt�DZ�m�4�/���c���-1��`Y�#@
&�f��CV��m����u{m	&كw�s_&���p8�ߙ�      P      x������ � �      Q      x������ � �      S      x������ � �      U      x������ � �     