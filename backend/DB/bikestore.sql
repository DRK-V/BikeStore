PGDMP     *                    {         	   bikestore    15.3    15.3 T    _           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            `           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            a           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            b           1262    35090 	   bikestore    DATABASE        CREATE DATABASE bikestore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE bikestore;
                postgres    false            �            1255    35221    set_current_date()    FUNCTION     �   CREATE FUNCTION public.set_current_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.fecha_venta = CURRENT_DATE;
  RETURN NEW;
END;
$$;
 )   DROP FUNCTION public.set_current_date();
       public          postgres    false            �            1259    35091    cliente    TABLE     �  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_usuario character varying(55) NOT NULL,
    rol_usuario character varying(20) NOT NULL,
    direccion character varying(100),
    correo character varying(70),
    telefono text,
    contrasena character varying(100),
    tipo_de_documento character varying(100),
    numero_de_documento character varying(100),
    imagen_usuario character varying(100)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    35096    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            c           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    215            �            1259    35097 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_comentario integer NOT NULL,
    texto character varying(255),
    codigo_producto integer,
    codigo_cliente integer,
    fecha_creacion date DEFAULT CURRENT_DATE
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    35101    comentario_id_comentario_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_comentario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.comentario_id_comentario_seq;
       public          postgres    false    216            d           0    0    comentario_id_comentario_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.comentario_id_comentario_seq OWNED BY public.comentario.id_comentario;
          public          postgres    false    217            �            1259    35102    compra    TABLE     %  CREATE TABLE public.compra (
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
       public         heap    postgres    false            �            1259    35105    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            e           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    35106    compra_producto    TABLE     �   CREATE TABLE public.compra_producto (
    id_compra_producto integer NOT NULL,
    codigo_producto integer,
    codigo_compra integer
);
 #   DROP TABLE public.compra_producto;
       public         heap    postgres    false            �            1259    35109 &   compra_producto_id_compra_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_producto_id_compra_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.compra_producto_id_compra_producto_seq;
       public          postgres    false    220            f           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.compra_producto_id_compra_producto_seq OWNED BY public.compra_producto.id_compra_producto;
          public          postgres    false    221            �            1259    35110    imagen_producto    TABLE     �   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    ruta_imagen character varying(255),
    nombre_imagen character varying(255),
    codigo_producto integer
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    35115    imagen_producto_id_imagen_seq    SEQUENCE     �   CREATE SEQUENCE public.imagen_producto_id_imagen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.imagen_producto_id_imagen_seq;
       public          postgres    false    222            g           0    0    imagen_producto_id_imagen_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.imagen_producto_id_imagen_seq OWNED BY public.imagen_producto.id_imagen;
          public          postgres    false    223            �            1259    35116    nueva_secuencia    SEQUENCE     x   CREATE SEQUENCE public.nueva_secuencia
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.nueva_secuencia;
       public          postgres    false            �            1259    35117    producto    TABLE       CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(120),
    descripcion_producto character varying(255),
    stock_disponible integer,
    tipo character varying(100),
    color character varying(50),
    precio numeric(10,2)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    35122    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    225            h           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    226            �            1259    35123    stock    TABLE     
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
       public         heap    postgres    false            �            1259    35126    stock_producto    TABLE     3  CREATE TABLE public.stock_producto (
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
       public         heap    postgres    false            �            1259    35129 $   stock_producto_id_stock_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_producto_id_stock_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.stock_producto_id_stock_producto_seq;
       public          postgres    false    228            i           0    0 $   stock_producto_id_stock_producto_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.stock_producto_id_stock_producto_seq OWNED BY public.stock_producto.id_stock_producto;
          public          postgres    false    229            �            1259    35130    venta    TABLE     Q  CREATE TABLE public.venta (
    id_venta integer NOT NULL,
    fecha_venta date,
    estado_venta character varying(100),
    descuento double precision,
    codigo_cliente integer,
    monto_final double precision,
    tipo_de_cuenta character varying(55),
    banco character varying(55),
    numero_de_cuenta character varying(55)
);
    DROP TABLE public.venta;
       public         heap    postgres    false            �            1259    35133    venta_id_venta_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_id_venta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.venta_id_venta_seq;
       public          postgres    false    230            j           0    0    venta_id_venta_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.venta_id_venta_seq OWNED BY public.venta.id_venta;
          public          postgres    false    231            �            1259    35134    venta_producto    TABLE     �   CREATE TABLE public.venta_producto (
    id_venta_producto integer NOT NULL,
    codigo_venta integer,
    codigo_producto integer,
    cantidad_producto integer
);
 "   DROP TABLE public.venta_producto;
       public         heap    postgres    false            �            1259    35137 $   venta_producto_id_venta_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_producto_id_venta_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.venta_producto_id_venta_producto_seq;
       public          postgres    false    232            k           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.venta_producto_id_venta_producto_seq OWNED BY public.venta_producto.id_venta_producto;
          public          postgres    false    233            �           2604    35138    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    215    214            �           2604    35139    comentario id_comentario    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_comentario SET DEFAULT nextval('public.comentario_id_comentario_seq'::regclass);
 G   ALTER TABLE public.comentario ALTER COLUMN id_comentario DROP DEFAULT;
       public          postgres    false    217    216            �           2604    35140    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    35141 "   compra_producto id_compra_producto    DEFAULT     �   ALTER TABLE ONLY public.compra_producto ALTER COLUMN id_compra_producto SET DEFAULT nextval('public.compra_producto_id_compra_producto_seq'::regclass);
 Q   ALTER TABLE public.compra_producto ALTER COLUMN id_compra_producto DROP DEFAULT;
       public          postgres    false    221    220            �           2604    35142    imagen_producto id_imagen    DEFAULT     �   ALTER TABLE ONLY public.imagen_producto ALTER COLUMN id_imagen SET DEFAULT nextval('public.imagen_producto_id_imagen_seq'::regclass);
 H   ALTER TABLE public.imagen_producto ALTER COLUMN id_imagen DROP DEFAULT;
       public          postgres    false    223    222            �           2604    35143    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    226    225            �           2604    35144     stock_producto id_stock_producto    DEFAULT     �   ALTER TABLE ONLY public.stock_producto ALTER COLUMN id_stock_producto SET DEFAULT nextval('public.stock_producto_id_stock_producto_seq'::regclass);
 O   ALTER TABLE public.stock_producto ALTER COLUMN id_stock_producto DROP DEFAULT;
       public          postgres    false    229    228            �           2604    35145    venta id_venta    DEFAULT     p   ALTER TABLE ONLY public.venta ALTER COLUMN id_venta SET DEFAULT nextval('public.venta_id_venta_seq'::regclass);
 =   ALTER TABLE public.venta ALTER COLUMN id_venta DROP DEFAULT;
       public          postgres    false    231    230            �           2604    35146     venta_producto id_venta_producto    DEFAULT     �   ALTER TABLE ONLY public.venta_producto ALTER COLUMN id_venta_producto SET DEFAULT nextval('public.venta_producto_id_venta_producto_seq'::regclass);
 O   ALTER TABLE public.venta_producto ALTER COLUMN id_venta_producto DROP DEFAULT;
       public          postgres    false    233    232            I          0    35091    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena, tipo_de_documento, numero_de_documento, imagen_usuario) FROM stdin;
    public          postgres    false    214   �l       K          0    35097 
   comentario 
   TABLE DATA           k   COPY public.comentario (id_comentario, texto, codigo_producto, codigo_cliente, fecha_creacion) FROM stdin;
    public          postgres    false    216   �m       M          0    35102    compra 
   TABLE DATA           }   COPY public.compra (id_compra, fecha_compra, monto_final, estado, direccion, codigo_administrador, color, texto) FROM stdin;
    public          postgres    false    218   �m       O          0    35106    compra_producto 
   TABLE DATA           ]   COPY public.compra_producto (id_compra_producto, codigo_producto, codigo_compra) FROM stdin;
    public          postgres    false    220   n       Q          0    35110    imagen_producto 
   TABLE DATA           a   COPY public.imagen_producto (id_imagen, ruta_imagen, nombre_imagen, codigo_producto) FROM stdin;
    public          postgres    false    222   6n       T          0    35117    producto 
   TABLE DATA           }   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock_disponible, tipo, color, precio) FROM stdin;
    public          postgres    false    225   ct       V          0    35123    stock 
   TABLE DATA           �   COPY public.stock (codigo_stock_producto, cantidad_minima_stock, fecha_registro, tipo_actualizacion, cantidad_agregada, cantidad_retirada, codigo_responsable) FROM stdin;
    public          postgres    false    227   �{       W          0    35126    stock_producto 
   TABLE DATA           �   COPY public.stock_producto (id_stock_producto, codigo_producto, nombre_producto, cantidad_producto, precio_unitario, color, codigo_compra, codigo_venta) FROM stdin;
    public          postgres    false    228   �{       Y          0    35130    venta 
   TABLE DATA           �   COPY public.venta (id_venta, fecha_venta, estado_venta, descuento, codigo_cliente, monto_final, tipo_de_cuenta, banco, numero_de_cuenta) FROM stdin;
    public          postgres    false    230   �{       [          0    35134    venta_producto 
   TABLE DATA           m   COPY public.venta_producto (id_venta_producto, codigo_venta, codigo_producto, cantidad_producto) FROM stdin;
    public          postgres    false    232   �|       l           0    0    cliente_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 5, true);
          public          postgres    false    215            m           0    0    comentario_id_comentario_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.comentario_id_comentario_seq', 4, true);
          public          postgres    false    217            n           0    0    compra_id_compra_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.compra_id_compra_seq', 1, false);
          public          postgres    false    219            o           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.compra_producto_id_compra_producto_seq', 1, false);
          public          postgres    false    221            p           0    0    imagen_producto_id_imagen_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.imagen_producto_id_imagen_seq', 177, true);
          public          postgres    false    223            q           0    0    nueva_secuencia    SEQUENCE SET     >   SELECT pg_catalog.setval('public.nueva_secuencia', 24, true);
          public          postgres    false    224            r           0    0    producto_id_producto_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.producto_id_producto_seq', 130, true);
          public          postgres    false    226            s           0    0 $   stock_producto_id_stock_producto_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.stock_producto_id_stock_producto_seq', 1, false);
          public          postgres    false    229            t           0    0    venta_id_venta_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.venta_id_venta_seq', 10, true);
          public          postgres    false    231            u           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.venta_producto_id_venta_producto_seq', 48, true);
          public          postgres    false    233            �           2606    35148    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    35150    comentario comentario_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_comentario);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    35152    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    35154 $   compra_producto compra_producto_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_pkey PRIMARY KEY (id_compra_producto);
 N   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_pkey;
       public            postgres    false    220            �           2606    35156 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    222            �           2606    35158    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    225            �           2606    35160 "   stock_producto stock_producto_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_pkey PRIMARY KEY (id_stock_producto);
 L   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_pkey;
       public            postgres    false    228            �           2606    35162    venta venta_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (id_venta);
 :   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_pkey;
       public            postgres    false    230            �           2606    35164 "   venta_producto venta_producto_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_pkey PRIMARY KEY (id_venta_producto);
 L   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_pkey;
       public            postgres    false    232            �           2620    35222    venta set_current_date_trigger    TRIGGER        CREATE TRIGGER set_current_date_trigger BEFORE INSERT ON public.venta FOR EACH ROW EXECUTE FUNCTION public.set_current_date();
 7   DROP TRIGGER set_current_date_trigger ON public.venta;
       public          postgres    false    230    234            �           2606    35165 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    225    3240    216            �           2606    35170 2   compra_producto compra_producto_codigo_compra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_compra_fkey FOREIGN KEY (codigo_compra) REFERENCES public.compra(id_compra);
 \   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_compra_fkey;
       public          postgres    false    220    218    3234            �           2606    35175 4   compra_producto compra_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_producto_fkey;
       public          postgres    false    3240    220    225            �           2606    35180    comentario fk_codigo_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk_codigo_cliente FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 F   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fk_codigo_cliente;
       public          postgres    false    214    3230    216            �           2606    35185 4   imagen_producto imagen_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_codigo_producto_fkey;
       public          postgres    false    225    222    3240            �           2606    35190 &   stock stock_codigo_stock_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_codigo_stock_producto_fkey FOREIGN KEY (codigo_stock_producto) REFERENCES public.stock_producto(id_stock_producto);
 P   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_codigo_stock_producto_fkey;
       public          postgres    false    228    227    3242            �           2606    35195 0   stock_producto stock_producto_codigo_compra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_codigo_compra_fkey FOREIGN KEY (codigo_compra) REFERENCES public.compra(id_compra);
 Z   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_codigo_compra_fkey;
       public          postgres    false    3234    218    228            �           2606    35200 /   stock_producto stock_producto_codigo_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock_producto
    ADD CONSTRAINT stock_producto_codigo_venta_fkey FOREIGN KEY (codigo_venta) REFERENCES public.venta(id_venta);
 Y   ALTER TABLE ONLY public.stock_producto DROP CONSTRAINT stock_producto_codigo_venta_fkey;
       public          postgres    false    228    3244    230            �           2606    35205    venta venta_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 I   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_codigo_cliente_fkey;
       public          postgres    false    3230    230    214            �           2606    35210 2   venta_producto venta_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 \   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_producto_fkey;
       public          postgres    false    225    3240    232            �           2606    35215 /   venta_producto venta_producto_codigo_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_venta_fkey FOREIGN KEY (codigo_venta) REFERENCES public.venta(id_venta);
 Y   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_venta_fkey;
       public          postgres    false    3244    230    232            I   �   x�m��n� ���S�	�2�⮍���norC�ZnT����M����7�0���l��h��dk\����s7H�g�@��D����h���%A�Y���lo#�|��`�<�/k�1HY 3F)4���#��&g?M�of�����kw�K������}�������o����p}=da"g�F�1�u[a�t�FΦ�M���E1���(kQ
�#�x�J8G�JH!e�EU��OC4��щ�kF�����      K   P   x�3�,�KTH�L�L�I-IT(H-�W�M�ID#8�9�8���u,uM��9A ,a��0�2�LIK���T� *      M      x������ � �      O      x������ � �      Q     x�͚�r�8ů�S���cܻ6��vfw�S���ؙL�CK�I��ӯ�ώ	q�I��6G>?Y�|B(�/n��x3�dye���z�;sg��E�d7y��i�%Ud_EY���}��eRګ"/+�s<�>jX,4,9h�Nh��0wz���\�_�����&�p��N_�`&	H%����8��D7!� �NtN���ۛ(K�WIf���ߖ�|k{��+�o��c����ߊ�(�e�UL����C��
���̤��_8�K���'z�u����wN
 ળ;�gUę�`��묒a�0��:��@XSkz�PDN���H�]����q����b���?�`�C~��7��-4�la-����||�uߥ`c������%>�X�Ǩp=Ct5 l,��:F�L8���Uɦ����cu�{j�?x���u8�Q�z6NETmK�P�^�[���j�P+_�[�R1�-u��7����C��aˀ@}�� .����J$<�?�����-p�E���ˬ*�8�-��!���,*׽O�#�jUj�Fj�P\|�L�a�8
\�Bi�&V����L!D-Y]�����\#jb�+���&��nR������_g��^ߜճ���p�1snޞ:����u ����ਗH�ҍ��m�_>7����0��F��3��p�7�g��3z��)7f�7�#��|�X��uDG�1U R5*8ō�B�*�Q�y-�����狫?�ܾ��˵�IƊ2g�va{�iԳxn��c`���&�a1|.g��!j���u�=�?E?�z��5r.�@3�7΃��+������p��D'#$8�Wq^UrC5�S�I���Nh��e�؄�Nk���hDD��	MsL4"���ل���ӈ�N�M7�zV,,ׇ����i ��D��{�f%n�7�~���'�a�}�h��^p�^��~�N�f������u�7?��v����Y�i��T��dooZ���u���,����]ŕ}���|�J����ձ�Z�O73�ֻ�����3dj���ʈ	��:Ӳ*�4�R%Lj�F����	�(<����b"��L�V����3	��6�����������W��|qutrի_���x9��X�#$<���Z	�������<̥�I������/Sn;0��������ΜL�@͓uZ��#�Zw���[$�C�W�	�q?�� <�w�͌��A<I{%�ȉ��X[s�+�#��nDN�x����*A��X�د�~��D�^EY�]�]�%i��W�=�qU�m��;�c\$���kB�x��U��&���q��g�&����:��/P%�x���Ftw��AN�N��G�`k�̬��M؞V�oV����ރ=��߬��ů�{Z_����d���@�ڳ�ݞ/��4a3�"�Y�7�=����o?t����˂�|OI�~^q�T#��AO� ��g@522�~и}�]##��^-�X-[��ۧ�3�T�n������CF�=1
�%:ddܓ�q���dd�\���<â��qO���=��0��Ҳ�� +�S�      T   "  x��X;s�8��_�Ie������.q4��ė�șKqD�
�`��Y�7.�Hq��Z���|�/YN�]��"���������g��IO���+��d�H�X�l�8e�؝:o8�c!J�x�
�i�f�XŚ��)N�<On��,��`*�1gJ'ؙf��I����[2	4��	������iU�i5KE�;�<����ș���rh\:r���ll�������a u�s%���*�S�n�k��!sɔ{�O���I��y��K��j<x@ ���t���?|�^\0�=@!�#
�]��e���,���͋#�>�ͬ0��a^<B�=Xײ��e�j-�d��J�6��$Dv_&������c�~�M�%aGl���dK�!�'���U����IxT���m8K'��Ǔ��}���
9��
�^/��sa��r��4�wl���ᾔ��&P�v{m*��)4n�hcl�W���/�`uל"��N��#�̚�^��w-NL�;B]�x�^�0�������e�z�瀋$�#Ɖ�����_� G�
F���ߏu�>��a=�Y��`I���Ҟ=�_IE��x�}�0�H�A��M�l`��s�x�igv8g���bJ�n'S��U�bTPE�d�%0�\�Q¯̋�$+H��RX�i��5���7@�E-y�r��4���v&6�^��TT��&����4�g��Z���,�*��T�=6j���ʓ'�p�:4�%"Lx'��5pی1�i�'9#�x�?c����#�4�h�g^H�ڙ7��]�${F��&�w	���3�'${��xB��_�;U�L�?��*����k�$�3�#?mG�B��j��h��أ��˺�Ȫ�Vmj���P����"l���U#�҉M�ٮ�f�a��k�GX�`��$���lA����Mx��E�qn<�5_�f��fut��pr֎�$8�w(�͉;fn�<��7��*���B��f�0��t(J�D�f�Pْ:�� Im��t��d�/+::q�ȬT���'-�>98o�:?YR3�����!4;k�0V�d���W�2�`���a�{K&+�뗸R)]PLr�|1�����4��N�F���k�b7�O����<��ҷ�O�dz�e�(*�5ݾC*�~��R+�q4�y�f�]��{5���	�
�
tB{����u��U�Ufv3˃W�g,Wh?��*cY*��a;��.4�x��]p]�tH'`�z�&<͛�w��62 -�.�m!p�r�6E��p�K!lA�G��5�VƝS[U&롫(����5�iG*�m׊���Ă��YtHM,�Sw��	�����'�=<�9(N/�C�J��#����M��}������"��c���_ъ��J45=d�i�w��l�!�����=
�BNJ���H=��]�i_7��k(N����3
��'9R!���vgZ�e�F��0\�}��#�u����\�+�����"� �N!2�:�ʱk�p�M������]�V��ݽ��FѨKhK�����ʹ]��\ʁ���zyS�=��~�gC�㞠0�KCQLv�ܷ~�K���s��h�덣��N�AK��0���k���0��D�
��`қ�p��=�_O��S+J4���i��$���!]�!�$wG-UqE��(�*7��ٕ|���MV�&'���s�����}׷�7�eŉ�1�e,ڳ��9l�P�J�}R�<5k��{�������ż�1#�O�5���Q���'�inu�u��W��ЁHM.G��L���uc�tKE�n068��"�"3�"������?v�P      V      x������ � �      W      x������ � �      Y   �   x���K� @�3��j��K?[=�*4�(��,<��m�� 0�1E�F9�`g�q�,p��E�Qt��]��Ɲ�	�KD7�@ћ�S��>R�|dʞ)s&�/!c�HȏA�ے������H�֙��ܶ+d���A�.�LG�,F���RRI����;�4�mW��И=V)�$�sJ�Wa���kq��q����^֘/���Rq�ղ�C��"����      [   �   x�E��1�7�2��\&�8�f�ײK��)�2G��,��HX&�`Ym��y�� ��@<7JYU�ת!�:"l�vV]�Awu�S�F�5���5׌��6�ζ���v�����x���޽��]>-~2�(mN��l���Ϗ��.7�     