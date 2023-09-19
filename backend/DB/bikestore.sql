PGDMP     /    /                {         	   bikestore    15.3    15.3 H    R           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            S           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            T           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            U           1262    35342 	   bikestore    DATABASE        CREATE DATABASE bikestore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE bikestore;
                postgres    false            �            1259    35343    cliente    TABLE     �  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre_usuario character varying(55) NOT NULL,
    rol_usuario character varying(20) NOT NULL,
    direccion character varying(100),
    correo character varying(70),
    telefono character varying(20),
    contrasena character varying(100),
    tipo_de_documento character varying(100),
    numero_de_documento character varying(100),
    imagen_usuario character varying(100)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false            �            1259    35348    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            V           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    215            �            1259    35349 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_comentario integer NOT NULL,
    codigo_producto integer,
    codigo_cliente integer,
    fecha_creacion date DEFAULT CURRENT_DATE,
    texto text
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    35355    comentario_id_comentario_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_comentario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.comentario_id_comentario_seq;
       public          postgres    false    216            W           0    0    comentario_id_comentario_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.comentario_id_comentario_seq OWNED BY public.comentario.id_comentario;
          public          postgres    false    217            �            1259    35356    compra    TABLE     �   CREATE TABLE public.compra (
    id_compra integer NOT NULL,
    fecha_compra date DEFAULT CURRENT_DATE,
    monto_final double precision,
    estado character varying(10),
    direccion character varying(100),
    codigo_administrador integer
);
    DROP TABLE public.compra;
       public         heap    postgres    false            �            1259    35359    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            X           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    35360    compra_producto    TABLE     �   CREATE TABLE public.compra_producto (
    id_compra_producto integer NOT NULL,
    codigo_producto integer,
    codigo_compra integer
);
 #   DROP TABLE public.compra_producto;
       public         heap    postgres    false            �            1259    35363 &   compra_producto_id_compra_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_producto_id_compra_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.compra_producto_id_compra_producto_seq;
       public          postgres    false    220            Y           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.compra_producto_id_compra_producto_seq OWNED BY public.compra_producto.id_compra_producto;
          public          postgres    false    221            �            1259    35364    imagen_producto    TABLE     �   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    ruta_imagen character varying(255),
    nombre_imagen character varying(255),
    codigo_producto integer
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    35369    imagen_producto_id_imagen_seq    SEQUENCE     �   CREATE SEQUENCE public.imagen_producto_id_imagen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.imagen_producto_id_imagen_seq;
       public          postgres    false    222            Z           0    0    imagen_producto_id_imagen_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.imagen_producto_id_imagen_seq OWNED BY public.imagen_producto.id_imagen;
          public          postgres    false    223            �            1259    35370    nueva_secuencia    SEQUENCE     x   CREATE SEQUENCE public.nueva_secuencia
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.nueva_secuencia;
       public          postgres    false            �            1259    35371    producto    TABLE       CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(120),
    descripcion_producto character varying(255),
    stock_disponible integer,
    tipo character varying(100),
    color character varying(50),
    precio numeric(10,2)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    35376    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    225            [           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    226            �            1259    35377    stock    TABLE     �   CREATE TABLE public.stock (
    codigo_producto integer,
    inventario_inicial integer,
    fecha_inventario_incial date,
    entrada integer,
    codigo_entrada integer,
    salida integer,
    codigo_salida integer,
    saldo integer
);
    DROP TABLE public.stock;
       public         heap    postgres    false            �            1259    35380    venta    TABLE     i  CREATE TABLE public.venta (
    id_venta integer NOT NULL,
    fecha_venta date DEFAULT CURRENT_DATE,
    estado_venta character varying(100),
    descuento double precision,
    codigo_cliente integer,
    monto_final double precision,
    tipo_de_cuenta character varying(255),
    banco character varying(255),
    numero_de_cuenta character varying(255)
);
    DROP TABLE public.venta;
       public         heap    postgres    false            �            1259    35386    venta_id_venta_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_id_venta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.venta_id_venta_seq;
       public          postgres    false    228            \           0    0    venta_id_venta_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.venta_id_venta_seq OWNED BY public.venta.id_venta;
          public          postgres    false    229            �            1259    35387    venta_producto    TABLE     �   CREATE TABLE public.venta_producto (
    id_venta_producto integer NOT NULL,
    codigo_venta integer,
    codigo_producto integer,
    cantidad_producto integer
);
 "   DROP TABLE public.venta_producto;
       public         heap    postgres    false            �            1259    35390 $   venta_producto_id_venta_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_producto_id_venta_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.venta_producto_id_venta_producto_seq;
       public          postgres    false    230            ]           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.venta_producto_id_venta_producto_seq OWNED BY public.venta_producto.id_venta_producto;
          public          postgres    false    231            �           2604    35391    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    215    214            �           2604    35392    comentario id_comentario    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_comentario SET DEFAULT nextval('public.comentario_id_comentario_seq'::regclass);
 G   ALTER TABLE public.comentario ALTER COLUMN id_comentario DROP DEFAULT;
       public          postgres    false    217    216            �           2604    35393    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    35394 "   compra_producto id_compra_producto    DEFAULT     �   ALTER TABLE ONLY public.compra_producto ALTER COLUMN id_compra_producto SET DEFAULT nextval('public.compra_producto_id_compra_producto_seq'::regclass);
 Q   ALTER TABLE public.compra_producto ALTER COLUMN id_compra_producto DROP DEFAULT;
       public          postgres    false    221    220            �           2604    35395    imagen_producto id_imagen    DEFAULT     �   ALTER TABLE ONLY public.imagen_producto ALTER COLUMN id_imagen SET DEFAULT nextval('public.imagen_producto_id_imagen_seq'::regclass);
 H   ALTER TABLE public.imagen_producto ALTER COLUMN id_imagen DROP DEFAULT;
       public          postgres    false    223    222            �           2604    35396    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    226    225            �           2604    35397    venta id_venta    DEFAULT     p   ALTER TABLE ONLY public.venta ALTER COLUMN id_venta SET DEFAULT nextval('public.venta_id_venta_seq'::regclass);
 =   ALTER TABLE public.venta ALTER COLUMN id_venta DROP DEFAULT;
       public          postgres    false    229    228            �           2604    35398     venta_producto id_venta_producto    DEFAULT     �   ALTER TABLE ONLY public.venta_producto ALTER COLUMN id_venta_producto SET DEFAULT nextval('public.venta_producto_id_venta_producto_seq'::regclass);
 O   ALTER TABLE public.venta_producto ALTER COLUMN id_venta_producto DROP DEFAULT;
       public          postgres    false    231    230            >          0    35343    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena, tipo_de_documento, numero_de_documento, imagen_usuario) FROM stdin;
    public          postgres    false    214   �Z       @          0    35349 
   comentario 
   TABLE DATA           k   COPY public.comentario (id_comentario, codigo_producto, codigo_cliente, fecha_creacion, texto) FROM stdin;
    public          postgres    false    216   �[       B          0    35356    compra 
   TABLE DATA           o   COPY public.compra (id_compra, fecha_compra, monto_final, estado, direccion, codigo_administrador) FROM stdin;
    public          postgres    false    218   \       D          0    35360    compra_producto 
   TABLE DATA           ]   COPY public.compra_producto (id_compra_producto, codigo_producto, codigo_compra) FROM stdin;
    public          postgres    false    220   o\       F          0    35364    imagen_producto 
   TABLE DATA           a   COPY public.imagen_producto (id_imagen, ruta_imagen, nombre_imagen, codigo_producto) FROM stdin;
    public          postgres    false    222   �\       I          0    35371    producto 
   TABLE DATA           }   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock_disponible, tipo, color, precio) FROM stdin;
    public          postgres    false    225   Bc       K          0    35377    stock 
   TABLE DATA           �   COPY public.stock (codigo_producto, inventario_inicial, fecha_inventario_incial, entrada, codigo_entrada, salida, codigo_salida, saldo) FROM stdin;
    public          postgres    false    227   Ok       L          0    35380    venta 
   TABLE DATA           �   COPY public.venta (id_venta, fecha_venta, estado_venta, descuento, codigo_cliente, monto_final, tipo_de_cuenta, banco, numero_de_cuenta) FROM stdin;
    public          postgres    false    228   lk       N          0    35387    venta_producto 
   TABLE DATA           m   COPY public.venta_producto (id_venta_producto, codigo_venta, codigo_producto, cantidad_producto) FROM stdin;
    public          postgres    false    230   Yl       ^           0    0    cliente_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 5, true);
          public          postgres    false    215            _           0    0    comentario_id_comentario_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.comentario_id_comentario_seq', 25, true);
          public          postgres    false    217            `           0    0    compra_id_compra_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.compra_id_compra_seq', 5, true);
          public          postgres    false    219            a           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.compra_producto_id_compra_producto_seq', 1, false);
          public          postgres    false    221            b           0    0    imagen_producto_id_imagen_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.imagen_producto_id_imagen_seq', 190, true);
          public          postgres    false    223            c           0    0    nueva_secuencia    SEQUENCE SET     >   SELECT pg_catalog.setval('public.nueva_secuencia', 24, true);
          public          postgres    false    224            d           0    0    producto_id_producto_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.producto_id_producto_seq', 150, true);
          public          postgres    false    226            e           0    0    venta_id_venta_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.venta_id_venta_seq', 9, true);
          public          postgres    false    229            f           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.venta_producto_id_venta_producto_seq', 48, true);
          public          postgres    false    231            �           2606    35400    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    35402    comentario comentario_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_comentario);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    35404    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    35406 $   compra_producto compra_producto_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_pkey PRIMARY KEY (id_compra_producto);
 N   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_pkey;
       public            postgres    false    220            �           2606    35408 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    222            �           2606    35410    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    225            �           2606    35412    venta venta_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (id_venta);
 :   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_pkey;
       public            postgres    false    228            �           2606    35414 "   venta_producto venta_producto_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_pkey PRIMARY KEY (id_venta_producto);
 L   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_pkey;
       public            postgres    false    230            �           2606    35415 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    225    216    3235            �           2606    35420 2   compra_producto compra_producto_codigo_compra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_compra_fkey FOREIGN KEY (codigo_compra) REFERENCES public.compra(id_compra);
 \   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_compra_fkey;
       public          postgres    false    3229    220    218            �           2606    35425 4   compra_producto compra_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_producto_fkey;
       public          postgres    false    220    3235    225            �           2606    35430    comentario fk_codigo_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk_codigo_cliente FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 F   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fk_codigo_cliente;
       public          postgres    false    3225    214    216            �           2606    35435 4   imagen_producto imagen_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_codigo_producto_fkey;
       public          postgres    false    3235    225    222            �           2606    35440    venta venta_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 I   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_codigo_cliente_fkey;
       public          postgres    false    228    214    3225            �           2606    35445 2   venta_producto venta_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 \   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_producto_fkey;
       public          postgres    false    230    225    3235            �           2606    35450 /   venta_producto venta_producto_codigo_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_venta_fkey FOREIGN KEY (codigo_venta) REFERENCES public.venta(id_venta);
 Y   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_venta_fkey;
       public          postgres    false    228    230    3237            >   �   x�m�Mn� ���)z�0�ػVi��t)B�D`,�����r�hX�����>e7x���L��}����~m�46S�e�q,�|Qlg8�����J`R
�쌶��K�94m�Yr��1>���u�������֙ �W����F1�)^䍨���F�e������c��8��x�Wv�uT2�2���%Է�1�2�Z�Cz,�#&��� �j�Sl=r��M�#�3'}�!?���      @   K   x���440�4�4202�5��54����*jh�]���Va#����9gRYY^z��1�TYRJYEYW� EV F      B   J   x�3�4202�5��5���#.#d	Kc3��1�����B�Y��)-3/1'�*1%��Y���%��=... A� �      D      x������ � �      F   �  x�͛�r�8Ư�S���clܻ6��vfw����ؙ��CK��ۧ�#�$�� �����O����W�e�{7eye���|�;g�>D�d?���i�%ed�DY����.ˋ����(m�����a1װ�a{�a\�������:����Vѕ�V8~%��"� ��W����&��+�M�t�ݔN����U�%���$�?��_�e��=�������cv_�_y�q�z��L����C�����!�IN?sޖ�7��/���ҏ��z�O
��gwh�zU�3s��sVVX�J
	�'c��^���5&c�/X��e�?�b���!?O�_�}lC�L�S���T^A-�lf͌���|0�گRb�?F����J|b�?F������Ƽ?�cT˸�Bҡ/Y�l���i:V�z�V�Oz]�pU��Du׶ح��5����W�V�Z��KE׶�-r�]%|���fy�-����rY�G�W"����t��ڏnF����ȵu��EG��E�{�Ȣ�Ӻ��}$�V+-�TZ
ħ�$FP�eq(!�(jd%���X�)DQW�.����\S��J�h�7��~�IyF��2r8�"~��9�g���c�ܼ<U*"�3 �!�d�D��
�C����O�y�W7�M�e�a?��M��{#���59�ց�:���@�1�`N�pc�Ic��!9����D�i�����T!�*�Q�󺢺���W�}�9��;�5��튜�˅����z�(C(o5rv�ᾜ��FQ#g�О/��}������c�\p�b �`�-�;�+����sw$a��!9�q^�Նjb��N�h�W;�	�Ê�	�������(DHCNi��(DHCNg��O!Br*7h�A�bf�>9z�^ڹp�ܞ��t{�����AI�׍�_�'��3���>���9�^�~:��f���W��q�7?��r�����Y�)��T��hooJ��[��hOϳd�O�O�(.��a'�+���폎=�r��t3s�}(e�D�<C������9Xg��E�fJ��U�ӳ����=
����#!=@{
��#!=c{6wmb$��pEx��߫-~)\G�Wg'W���|p�'�����J"�S�IHh��:&uW���\j]�t��nH��2ێ)�񗐇P��:FtG y���cbwj�Y��!=�������]R򣔍����'�ٿ%l ��0$�J�"GVz$�*�}�Y�!>�pYP��JO��X�D�#+=�묷Q�pԛ(K���m�-P��r�鉫��&ob�z����UM�^6���=�	bӋ˰��w�M�^���_2X�V����zmDu�=��x�T��Q(��)�������	�i��fl(~�5�i��fEm(~�Ũi���B�����tdˇ#,��4a�
�e����>ݼ����Wl<G��2��kJ
���WK��x�)Dc�P��5�O4_yW��Xދ�����^?n��jҩ�;`��Y����E�ƚ%�o%Zdh��?��P�T24���o�â���&q���=�krhmS�O1|4I�����P�8�|0�$K��><��9Ԅ�z}8t��B����P#}-`A��f���f݇��^#q��vq�Y�,�c�#i.��jo~~���5��]��a�� �8&����@���ai~������,�?@���      I   �  x��XM��6=ÿ��L���(iF��x�ڤ*�lYvŇ�@ � ����3�o|�C��r��k���H��VSe�"���������R�H��ߋ�h�|�G&Q	_�M��`L���������HmE�*.n�XmÕ呠[R���1߫d�$�ڋD��XX���M�塊8=K۝�_�1�J��J�2���#6	��r�\�f�?6���g4���oı�C)��"�éo?��dmb�V�Ub~�N_]dDΓ�?���P���C����;����}ů.�^�
e�	>g��c��gů�}x{��a�f�������x&Έj�v�_W�2���TG���mSE�j��nXD�r���oൃX숯�,�&�e�OB*.B%�V��r�����Qp�1���).+��̃J�7=�-����������Ly��h+�����,����� ��-m����Qj@k�X��5������g�&��r�"�/&&�PW=^�Rl"p����q	ݬq�ʦ9b����|��8������)��Ʀ����=��T�ݚ��Td�Fx��b�#����]���=�"�/�6U���Q��u$bi��t�B'�Ŕ4:k'S���U�bTT�s��48�\�Q�̋�3{(���(�B<ȸ\���]ְ�'OUW�&Ԕ���l���7%�\���R��פet�_�h)�?c2ŗoV��W�٩�gk��8�ʓ'����M쨳*�"���q���#Ʃ��@Ϥ`�v��~~+D�Τx��W��2`����(����7����j�5"R6�K�g�t����,�{a��~gU)��O�o�C~�tԵN��}�6�z��I��ݎ�y���A�]֭G^��jS��*B}��~�Q+�F��?��p͝Ì��5?V�:���r&�R�1�<1�qnb�	�آf��fu��pr��y/R�o(�7���0�CK{!����W��7녋ڽ�U)�h�\8[*[�$$�M�α١��@�;�z�j�VF���'-�>9�m��|��f�xz2Clv�ti���=��G��� n�S�{2YI^�ĕ�H�b�S��x!�x�&v���l6<^��u%M��[�ٸ���}�X'��QF�@De��He�oP[���lf�㢙yw�d���D]s}z� {@)�G�:]_�m":@{t���̒���L����
�X��<e��R��&ѵ8E�b\�C:���o҃Ѽ9|�Hk#�B�r���o WhS�n�¶���|�s+�ɩ�*���U�JfE&�'�H���vm�k�H,bB�:���Ů����"�b�����Ň��|	�{�)�9ĩd�:��\�9٤�"�y�h��Q�����G�����Q-�hj�np�������eC�5���(��]D�F�!$��]���)����q�<~�N���I�TB����ݙVt�ƴ�z��LW���+�u_絧��&pW*�����
��������q����z���׷�������f�{zq_�v�Q�Ж8u��-�i��ӹ�I�וySf���o?��!��T� 3�B19�o��/A�6���4W����5��*�;}� �mE�Ƚ�y.LJvP� ��g��7��]��ד�t�D���S3���s���.%����{8j�(-��]�#���rV����>��J��A��c�_��w}�o_6�e�I��:Q�����P�K����yj�\vz�	���j��ղcN�/��Q"�Q��SOt���p�f'�l[ev*u����~O��֍ԭ#b��ck�+�(2�/b�	E��&܄�>��H3�q>�'7	.7�^n2cI��l7����j�g�6	*8s��d���6P�u�n$�f��V7/��}��, �����@Anqw�ƻ������m��I�|-3y�Ip�Iq8�)s���a#�;���j�"����n^du��9�ِ��8�V',�v8lp܎�� 1�e2����Q$�6e���1����;�0��d�ѫW�����N      K      x������ � �      L   �   x���M� F��)z���ei]�	ܠ%Q0���6�ŋ9���jTB ��8�"�:�9�m(��F��@a1o;�m��&�|0[6e�]l�۹���Q���!#;F�4{��bHd_	��P��K�
Kչ�ǦG��$�XU�O&��6��@y�2#�O�D�/m2��
��Y�6���*'%����'|U�i�E\��z�ND?Uz�b ���"�!�bX�o      N   �   x�E��1�7�2��\&�8�f�ײK��)�2G��,��HX&�`Ym��y�� ��@<7JYU�ת!�:"l�vV]�Awu�S�F�5���5׌��6�ζ���v�����x���޽��]>-~2�(mN��l���Ϗ��.7�     