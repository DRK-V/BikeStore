PGDMP         :                {         	   bikestore    15.3    15.3 C    K           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            L           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            M           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            N           1262    49588 	   bikestore    DATABASE     |   CREATE DATABASE bikestore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE bikestore;
                postgres    false            �            1259    49589    cliente    TABLE     �  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_usuario character varying(55),
    rol_usuario character varying(50),
    direccion character varying(100),
    correo character varying(70),
    telefono bigint,
    contrasena character varying,
    tipo_de_documento character varying(10),
    numero_de_documento character varying(50),
    imagen_usuario text
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    49594    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            O           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    215            �            1259    49595 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_producto integer NOT NULL,
    texto character varying(255),
    fecha_comentario date,
    codigo_producto integer
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    49598    comentario_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.comentario_id_producto_seq;
       public          postgres    false    216            P           0    0    comentario_id_producto_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.comentario_id_producto_seq OWNED BY public.comentario.id_producto;
          public          postgres    false    217            �            1259    49599    compra    TABLE     �   CREATE TABLE public.compra (
    id_compra integer NOT NULL,
    fecha_compra date,
    estado character varying(100),
    codigo_cliente integer,
    detalle_compra integer
);
    DROP TABLE public.compra;
       public         heap    postgres    false            �            1259    49602    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            Q           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    49603    detalle_compra    TABLE     �   CREATE TABLE public.detalle_compra (
    id_detalle integer NOT NULL,
    fecha_pedido date,
    direccion character varying(100),
    estado_entrega character varying(100),
    precio double precision,
    codigo_cliente integer
);
 "   DROP TABLE public.detalle_compra;
       public         heap    postgres    false            �            1259    49606    detalle_compra_id_detalle_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_compra_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.detalle_compra_id_detalle_seq;
       public          postgres    false    220            R           0    0    detalle_compra_id_detalle_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.detalle_compra_id_detalle_seq OWNED BY public.detalle_compra.id_detalle;
          public          postgres    false    221            �            1259    49607    imagen_producto    TABLE     �   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    nombre_imagen text,
    ruta_imagen text,
    codigo_producto integer
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    49612 
   metodopago    TABLE     �   CREATE TABLE public.metodopago (
    id_metodopago integer NOT NULL,
    nombre character varying(200),
    descripcion character varying(200)
);
    DROP TABLE public.metodopago;
       public         heap    postgres    false            �            1259    49615    metodopago_id_metodopago_seq    SEQUENCE     �   CREATE SEQUENCE public.metodopago_id_metodopago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.metodopago_id_metodopago_seq;
       public          postgres    false    223            S           0    0    metodopago_id_metodopago_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.metodopago_id_metodopago_seq OWNED BY public.metodopago.id_metodopago;
          public          postgres    false    224            �            1259    49616    pago    TABLE     �   CREATE TABLE public.pago (
    id_pago integer NOT NULL,
    total double precision,
    codigo_cliente integer,
    codigo_metodopago integer
);
    DROP TABLE public.pago;
       public         heap    postgres    false            �            1259    49619    pago_id_pago_seq    SEQUENCE     �   CREATE SEQUENCE public.pago_id_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pago_id_pago_seq;
       public          postgres    false    225            T           0    0    pago_id_pago_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pago_id_pago_seq OWNED BY public.pago.id_pago;
          public          postgres    false    226            �            1259    49620    pedido_producto    TABLE     w   CREATE TABLE public.pedido_producto (
    id_pedido integer,
    id_producto integer,
    cantidad_producto integer
);
 #   DROP TABLE public.pedido_producto;
       public         heap    postgres    false            �            1259    49623    producto    TABLE       CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(120),
    descripcion_producto character varying(255),
    stock integer,
    precio double precision,
    tipo character varying(100),
    color character varying(50)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    49628    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    228            U           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    229            �           2604    49629    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    215    214            �           2604    49630    comentario id_producto    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_producto SET DEFAULT nextval('public.comentario_id_producto_seq'::regclass);
 E   ALTER TABLE public.comentario ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    217    216            �           2604    49631    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    49632    detalle_compra id_detalle    DEFAULT     �   ALTER TABLE ONLY public.detalle_compra ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_compra_id_detalle_seq'::regclass);
 H   ALTER TABLE public.detalle_compra ALTER COLUMN id_detalle DROP DEFAULT;
       public          postgres    false    221    220            �           2604    49633    metodopago id_metodopago    DEFAULT     �   ALTER TABLE ONLY public.metodopago ALTER COLUMN id_metodopago SET DEFAULT nextval('public.metodopago_id_metodopago_seq'::regclass);
 G   ALTER TABLE public.metodopago ALTER COLUMN id_metodopago DROP DEFAULT;
       public          postgres    false    224    223            �           2604    49634    pago id_pago    DEFAULT     l   ALTER TABLE ONLY public.pago ALTER COLUMN id_pago SET DEFAULT nextval('public.pago_id_pago_seq'::regclass);
 ;   ALTER TABLE public.pago ALTER COLUMN id_pago DROP DEFAULT;
       public          postgres    false    226    225            �           2604    49635    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    229    228            9          0    49589    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena, tipo_de_documento, numero_de_documento, imagen_usuario) FROM stdin;
    public          postgres    false    214   �Q       ;          0    49595 
   comentario 
   TABLE DATA           [   COPY public.comentario (id_producto, texto, fecha_comentario, codigo_producto) FROM stdin;
    public          postgres    false    216   �R       =          0    49599    compra 
   TABLE DATA           a   COPY public.compra (id_compra, fecha_compra, estado, codigo_cliente, detalle_compra) FROM stdin;
    public          postgres    false    218   �R       ?          0    49603    detalle_compra 
   TABLE DATA           u   COPY public.detalle_compra (id_detalle, fecha_pedido, direccion, estado_entrega, precio, codigo_cliente) FROM stdin;
    public          postgres    false    220   �R       A          0    49607    imagen_producto 
   TABLE DATA           a   COPY public.imagen_producto (id_imagen, nombre_imagen, ruta_imagen, codigo_producto) FROM stdin;
    public          postgres    false    222   =S       B          0    49612 
   metodopago 
   TABLE DATA           H   COPY public.metodopago (id_metodopago, nombre, descripcion) FROM stdin;
    public          postgres    false    223   �X       D          0    49616    pago 
   TABLE DATA           Q   COPY public.pago (id_pago, total, codigo_cliente, codigo_metodopago) FROM stdin;
    public          postgres    false    225   �X       F          0    49620    pedido_producto 
   TABLE DATA           T   COPY public.pedido_producto (id_pedido, id_producto, cantidad_producto) FROM stdin;
    public          postgres    false    227   �X       G          0    49623    producto 
   TABLE DATA           r   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock, precio, tipo, color) FROM stdin;
    public          postgres    false    228   Y       V           0    0    cliente_id_usuario_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 23, true);
          public          postgres    false    215            W           0    0    comentario_id_producto_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.comentario_id_producto_seq', 1, false);
          public          postgres    false    217            X           0    0    compra_id_compra_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.compra_id_compra_seq', 1, false);
          public          postgres    false    219            Y           0    0    detalle_compra_id_detalle_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.detalle_compra_id_detalle_seq', 6, true);
          public          postgres    false    221            Z           0    0    metodopago_id_metodopago_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.metodopago_id_metodopago_seq', 1, false);
          public          postgres    false    224            [           0    0    pago_id_pago_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pago_id_pago_seq', 1, false);
          public          postgres    false    226            \           0    0    producto_id_producto_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.producto_id_producto_seq', 5, true);
          public          postgres    false    229            �           2606    49637    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    49639    comentario comentario_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_producto);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    49641    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    49643 "   detalle_compra detalle_compra_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.detalle_compra
    ADD CONSTRAINT detalle_compra_pkey PRIMARY KEY (id_detalle);
 L   ALTER TABLE ONLY public.detalle_compra DROP CONSTRAINT detalle_compra_pkey;
       public            postgres    false    220            �           2606    49645 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    222            �           2606    49647    metodopago metodopago_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT metodopago_pkey PRIMARY KEY (id_metodopago);
 D   ALTER TABLE ONLY public.metodopago DROP CONSTRAINT metodopago_pkey;
       public            postgres    false    223            �           2606    49649    pago pago_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_pkey PRIMARY KEY (id_pago);
 8   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_pkey;
       public            postgres    false    225            �           2606    49651    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    228            �           2606    49652 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    228    3233    216            �           2606    49657 !   compra compra_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 K   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_codigo_cliente_fkey;
       public          postgres    false    214    3219    218            �           2606    49662 1   detalle_compra detalle_compra_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_compra
    ADD CONSTRAINT detalle_compra_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 [   ALTER TABLE ONLY public.detalle_compra DROP CONSTRAINT detalle_compra_codigo_cliente_fkey;
       public          postgres    false    214    3219    220            �           2606    49667    compra fk_detalle_compra    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT fk_detalle_compra FOREIGN KEY (detalle_compra) REFERENCES public.detalle_compra(id_detalle);
 B   ALTER TABLE ONLY public.compra DROP CONSTRAINT fk_detalle_compra;
       public          postgres    false    218    220    3225            �           2606    49672 4   imagen_producto imagen_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_codigo_producto_fkey;
       public          postgres    false    3233    228    222            �           2606    49677    pago pago_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 G   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_codigo_cliente_fkey;
       public          postgres    false    225    214    3219            �           2606    49682     pago pago_codigo_metodopago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pago
    ADD CONSTRAINT pago_codigo_metodopago_fkey FOREIGN KEY (codigo_metodopago) REFERENCES public.pago(id_pago);
 J   ALTER TABLE ONLY public.pago DROP CONSTRAINT pago_codigo_metodopago_fkey;
       public          postgres    false    225    3231    225            �           2606    49687 .   pedido_producto pedido_producto_id_pedido_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido_producto
    ADD CONSTRAINT pedido_producto_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.detalle_compra(id_detalle);
 X   ALTER TABLE ONLY public.pedido_producto DROP CONSTRAINT pedido_producto_id_pedido_fkey;
       public          postgres    false    220    227    3225            �           2606    49692 0   pedido_producto pedido_producto_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pedido_producto
    ADD CONSTRAINT pedido_producto_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto);
 Z   ALTER TABLE ONLY public.pedido_producto DROP CONSTRAINT pedido_producto_id_producto_fkey;
       public          postgres    false    3233    228    227            9   �   x�mOAn�0<�_��5��=�^)R���2���BU�jW�=�Ύf���� �m�?͉ۘ����?u=��_b
�2�4h I��ou(�&���� �%�GX���������$���is)���>���sS�L.�I�h���m�h2lYr�8�J�����}�L��p��B;����Ԛf]uq���*j�5ֺl�a�8#I� ���%��ǡ�\�	c�k      ;      x������ � �      =      x������ � �      ?   k   x�3�4202�5��5��tN��IUp�Qp�,MILQp�t�SHN����*� N#C.�&c,�
R�R2S�JR9MM�zL��I��K�ɬJL��45�j2�2#�"��=... Z4�      A   F  x���Kr�6@��)��, � �[f&�8�$e9�,��h��1-�(J��F9G.6���))o\%��@7�h�(�"+��M�����v�]5�No���7���o���y�(�A�O���<��P�L&b��[WuCioIHKJ'�b�P/�/"����_F�eJ�/#�2N�g-ÛgUӰ��̽4������F BNN΀dň,�p #T�a�K�J��%��+H|���J|�X���ޱU���e���xν{��VK����<X�	m�!@�z��GJ|�����|�M����G]yL����1LP29��
6l|mS	@v[��R�G �=�����.{�� }j�����ժZ=��̷����lW��׋j��\l2/��=3+�F��/+�#[�
�*��#�;S����a��7Y]l>�fH�`�'
���# (��u���n��fA�����ZD�3����" Nn����h�ݿL�����,���Oj�.��b�v����ᒉÚ��B�*�=Ȏ�C���H8mW��3d�<���S� ����ɃgC2!5����Fn�|�?-M�<q"7�m[~:N��ς>K�W��1���r�BD���B�BD�+��f�y-Y7�|YW�8Ob�(�'����Z�cU���J���Xz=�y��S�	��~Q,�w>�s���) �rJ���y߱DB�)�I(�q�p"�qhpb�	���I'r���_�����w���k6砩��1���I{ �Fj�f0"��>�.Աu�Q�� I�yd�^B����M�6�6B�{�l����A�U����˚f�,�^�6X!���M��S|��g��!U�sʙBre����1�Ŏ�,e�j��uY�y}SW�RNƇa���93P�" �c�òWc�R͊���!H�V;���D��0�{h��c1�`�BDM~[�
�SLl^"{���=h�C���|�C���s".�`SӢt���y��Qף��0hpq����8lp]OA��R�s�8ڷb�-֬z�{�WHV�����^L��O�6��wb{r%:����ɵ����}˵�������y���e��e?�͢���R���}M����U' ��?����L+{��Z�����}�VDk�8�`������Ȩ�K]U��ŶyI���y�;�q��b	\�%,�m���p$��lt�~uad{�6>��v������=�r~�*�����wp^�5�D�kT��>�$=^:������0>4�����w+	�Z��SS��E 꾙i��U�d-�O��� 9S(^O�UH���S�μ�_O�P��� �U4��      B      x������ � �      D      x������ � �      F   9   x�ʱ 0B�Z�ɝ�&�ϑ�� ��BdMK]t�X�c�ɧ�SMS8Mﳍ]�H���	�      G   �  x��X�r�6]K_���Y#)qOW��6�I���N��!		0 �Z�/���]�Տ�\��H�r��f����׹��.�PB˒�K��bWw��N:vSXW���KV8��|as�*Ù�R�'�l!��/�2���x�Y�g�K%����z�-��;��5fW�;O�M��t֏���σ�tB�����?�`�Ξ���H��?�%�:��J��s.�L�)J˜�Z��̲�#@/�x�|�WzTo���d�\���B��L��-�;[���dWz��(��]o�*��`�i�O��? ��ڎ��3U�я_*���ck���1���E��~K��@��d
���-%�^��#YF1Uk�6�$V�&,����	�g��w��a�Ӷυ-K��p�����m�� ����V��W�C8 /�]xΔ��LJ��S&���\~��VH�����KI��t����l�R�ξ�Bn����<������a*��!.}��u;�]��1��&Oܩ���<q��Ύ���������Z����V�c>NC��-�-���3f׆E�3g��p]�H[/�Z����*�h[��\����#~��$܇g�͟���7[Py�	��r	~:�S�]��{��j�hI�6B�S6+���k�� �,����N`J'�#M�3w��#�Ј�����%q� ߞ�&�ۈ�mq0�f�"x�L�5�' ��:"e�{��.����r�?�R�u�|s�l㫥B�#�w�폴����qRj>��d���%�*��"�I`�����8�����o��ܴ.���0U,�d��P�6�f+*J�>���X�
K?A9��p/Ԓ��������w�s|���L�'Խ�����iXC�R�c�)6_� ����+G��BZPcM��:�t�؞ѩY*7���h�tzЋ���L�,fT�l�����v�Fy���?d]�*F��j3�+o��]��:~֗z�v��iWC����)����W�_��H�����B5��;�~�h���!H)ڥ�u�n�h=C����l�]��XtS"�
i��]Ȱ����k��NNa�=pnk�]8)�.�P)4o-�c� c��>�H��-ɿ��(Ϛ#��E"��AM��9�V��Y�����;�w8��m�b�x�N*I�� �4�i�}���]B�C�#�D1�s'�Hט@/��MO0~�An�e�Պ}�<�0��Pަ�ݖ�Ic�j�"�;�$Gl��sۇb_���S��Y��I�G5�v�r�yѸ��䟇�����:����;�U���ߺ$�UJa�)��H���P$��<��v��3;���ATڦV}��7���B��Hw�<�@�s<�+��jQ&/�� ����gG;BKo��u�.E��?F���h�XI֐%�t��l�'����Cn������H���(%ي+�r��Y��"7]	˜B}�61��c��m���1]s!�E�T��MS�fX�M�О*z��=�u�a�Ze�w�A�x#��vi���)�'� ��0�  ;b1��6�weH+���@)N6=o���_���&l�����l��ED����y�:ݓW�ctFX&}�D��[WP���(�Rl{u���u/�Z�6�]i�j���Yt��U`:����!���:Pty��}萾�H*M��=��^e��+4���-�*����I�Ѝ�J�7w�Z���#�̌l<���盐k�{H�x/���X��I��P��,��D�Nzq͝�d������#���p8����     