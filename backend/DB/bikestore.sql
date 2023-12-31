PGDMP             	            {         	   bikestore    15.3    15.3 I    U           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            V           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            W           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            X           1262    17260 	   bikestore    DATABASE     |   CREATE DATABASE bikestore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE bikestore;
                postgres    false            �            1255    17389    set_current_date()    FUNCTION     �   CREATE FUNCTION public.set_current_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.fecha_inventario_inicial = current_date;
  RETURN NEW;
END;
$$;
 )   DROP FUNCTION public.set_current_date();
       public          postgres    false            �            1259    17261    cliente    TABLE     �  CREATE TABLE public.cliente (
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
       public         heap    postgres    false            �            1259    17266    cliente_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_id_usuario_seq;
       public          postgres    false    214            Y           0    0    cliente_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_id_usuario_seq OWNED BY public.cliente.id_cliente;
          public          postgres    false    215            �            1259    17267 
   comentario    TABLE     �   CREATE TABLE public.comentario (
    id_comentario integer NOT NULL,
    codigo_producto integer,
    codigo_cliente integer,
    fecha_creacion date DEFAULT CURRENT_DATE,
    texto text
);
    DROP TABLE public.comentario;
       public         heap    postgres    false            �            1259    17273    comentario_id_comentario_seq    SEQUENCE     �   CREATE SEQUENCE public.comentario_id_comentario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.comentario_id_comentario_seq;
       public          postgres    false    216            Z           0    0    comentario_id_comentario_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.comentario_id_comentario_seq OWNED BY public.comentario.id_comentario;
          public          postgres    false    217            �            1259    17274    compra    TABLE     �   CREATE TABLE public.compra (
    id_compra integer NOT NULL,
    fecha_compra date DEFAULT CURRENT_DATE,
    monto_final double precision,
    estado character varying(10),
    direccion character varying(100),
    codigo_administrador integer
);
    DROP TABLE public.compra;
       public         heap    postgres    false            �            1259    17278    compra_id_compra_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_id_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.compra_id_compra_seq;
       public          postgres    false    218            [           0    0    compra_id_compra_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.compra_id_compra_seq OWNED BY public.compra.id_compra;
          public          postgres    false    219            �            1259    17279    compra_producto    TABLE     �   CREATE TABLE public.compra_producto (
    id_compra_producto integer NOT NULL,
    codigo_producto integer,
    codigo_compra integer
);
 #   DROP TABLE public.compra_producto;
       public         heap    postgres    false            �            1259    17282 &   compra_producto_id_compra_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.compra_producto_id_compra_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.compra_producto_id_compra_producto_seq;
       public          postgres    false    220            \           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.compra_producto_id_compra_producto_seq OWNED BY public.compra_producto.id_compra_producto;
          public          postgres    false    221            �            1259    17283    imagen_producto    TABLE     �   CREATE TABLE public.imagen_producto (
    id_imagen integer NOT NULL,
    ruta_imagen character varying(255),
    nombre_imagen character varying(255),
    codigo_producto integer
);
 #   DROP TABLE public.imagen_producto;
       public         heap    postgres    false            �            1259    17288    imagen_producto_id_imagen_seq    SEQUENCE     �   CREATE SEQUENCE public.imagen_producto_id_imagen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.imagen_producto_id_imagen_seq;
       public          postgres    false    222            ]           0    0    imagen_producto_id_imagen_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.imagen_producto_id_imagen_seq OWNED BY public.imagen_producto.id_imagen;
          public          postgres    false    223            �            1259    17289    nueva_secuencia    SEQUENCE     x   CREATE SEQUENCE public.nueva_secuencia
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.nueva_secuencia;
       public          postgres    false            �            1259    17290    producto    TABLE       CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    nombre_producto character varying(120),
    descripcion_producto character varying(255),
    stock_disponible integer,
    tipo character varying(100),
    color character varying(50),
    precio numeric(10,2)
);
    DROP TABLE public.producto;
       public         heap    postgres    false            �            1259    17295    producto_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.producto_id_producto_seq;
       public          postgres    false    225            ^           0    0    producto_id_producto_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;
          public          postgres    false    226            �            1259    17406    stock    TABLE     6  CREATE TABLE public.stock (
    codigo_producto integer,
    inventario_inicial integer,
    fecha_inventario_inicial date DEFAULT CURRENT_DATE,
    entrada integer,
    codigo_entrada integer,
    salida integer,
    codigo_salida integer,
    saldo integer GENERATED ALWAYS AS ((entrada - salida)) STORED
);
    DROP TABLE public.stock;
       public         heap    postgres    false            �            1259    17299    venta    TABLE     i  CREATE TABLE public.venta (
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
       public         heap    postgres    false            �            1259    17305    venta_id_venta_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_id_venta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.venta_id_venta_seq;
       public          postgres    false    227            _           0    0    venta_id_venta_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.venta_id_venta_seq OWNED BY public.venta.id_venta;
          public          postgres    false    228            �            1259    17306    venta_producto    TABLE     �   CREATE TABLE public.venta_producto (
    id_venta_producto integer NOT NULL,
    codigo_venta integer,
    codigo_producto integer,
    cantidad_producto integer
);
 "   DROP TABLE public.venta_producto;
       public         heap    postgres    false            �            1259    17309 $   venta_producto_id_venta_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_producto_id_venta_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.venta_producto_id_venta_producto_seq;
       public          postgres    false    229            `           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.venta_producto_id_venta_producto_seq OWNED BY public.venta_producto.id_venta_producto;
          public          postgres    false    230            �           2604    17310    cliente id_cliente    DEFAULT     x   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_usuario_seq'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          postgres    false    215    214            �           2604    17311    comentario id_comentario    DEFAULT     �   ALTER TABLE ONLY public.comentario ALTER COLUMN id_comentario SET DEFAULT nextval('public.comentario_id_comentario_seq'::regclass);
 G   ALTER TABLE public.comentario ALTER COLUMN id_comentario DROP DEFAULT;
       public          postgres    false    217    216            �           2604    17312    compra id_compra    DEFAULT     t   ALTER TABLE ONLY public.compra ALTER COLUMN id_compra SET DEFAULT nextval('public.compra_id_compra_seq'::regclass);
 ?   ALTER TABLE public.compra ALTER COLUMN id_compra DROP DEFAULT;
       public          postgres    false    219    218            �           2604    17313 "   compra_producto id_compra_producto    DEFAULT     �   ALTER TABLE ONLY public.compra_producto ALTER COLUMN id_compra_producto SET DEFAULT nextval('public.compra_producto_id_compra_producto_seq'::regclass);
 Q   ALTER TABLE public.compra_producto ALTER COLUMN id_compra_producto DROP DEFAULT;
       public          postgres    false    221    220            �           2604    17314    imagen_producto id_imagen    DEFAULT     �   ALTER TABLE ONLY public.imagen_producto ALTER COLUMN id_imagen SET DEFAULT nextval('public.imagen_producto_id_imagen_seq'::regclass);
 H   ALTER TABLE public.imagen_producto ALTER COLUMN id_imagen DROP DEFAULT;
       public          postgres    false    223    222            �           2604    17315    producto id_producto    DEFAULT     |   ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);
 C   ALTER TABLE public.producto ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    226    225            �           2604    17316    venta id_venta    DEFAULT     p   ALTER TABLE ONLY public.venta ALTER COLUMN id_venta SET DEFAULT nextval('public.venta_id_venta_seq'::regclass);
 =   ALTER TABLE public.venta ALTER COLUMN id_venta DROP DEFAULT;
       public          postgres    false    228    227            �           2604    17317     venta_producto id_venta_producto    DEFAULT     �   ALTER TABLE ONLY public.venta_producto ALTER COLUMN id_venta_producto SET DEFAULT nextval('public.venta_producto_id_venta_producto_seq'::regclass);
 O   ALTER TABLE public.venta_producto ALTER COLUMN id_venta_producto DROP DEFAULT;
       public          postgres    false    230    229            A          0    17261    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, nombre_usuario, rol_usuario, direccion, correo, telefono, contrasena, tipo_de_documento, numero_de_documento, imagen_usuario) FROM stdin;
    public          postgres    false    214   Z\       C          0    17267 
   comentario 
   TABLE DATA           k   COPY public.comentario (id_comentario, codigo_producto, codigo_cliente, fecha_creacion, texto) FROM stdin;
    public          postgres    false    216   X]       E          0    17274    compra 
   TABLE DATA           o   COPY public.compra (id_compra, fecha_compra, monto_final, estado, direccion, codigo_administrador) FROM stdin;
    public          postgres    false    218   u]       G          0    17279    compra_producto 
   TABLE DATA           ]   COPY public.compra_producto (id_compra_producto, codigo_producto, codigo_compra) FROM stdin;
    public          postgres    false    220   ,^       I          0    17283    imagen_producto 
   TABLE DATA           a   COPY public.imagen_producto (id_imagen, ruta_imagen, nombre_imagen, codigo_producto) FROM stdin;
    public          postgres    false    222   �^       L          0    17290    producto 
   TABLE DATA           }   COPY public.producto (id_producto, nombre_producto, descripcion_producto, stock_disponible, tipo, color, precio) FROM stdin;
    public          postgres    false    225   �d       R          0    17406    stock 
   TABLE DATA           �   COPY public.stock (codigo_producto, inventario_inicial, fecha_inventario_inicial, entrada, codigo_entrada, salida, codigo_salida) FROM stdin;
    public          postgres    false    231   Bk       N          0    17299    venta 
   TABLE DATA           �   COPY public.venta (id_venta, fecha_venta, estado_venta, descuento, codigo_cliente, monto_final, tipo_de_cuenta, banco, numero_de_cuenta) FROM stdin;
    public          postgres    false    227   �k       P          0    17306    venta_producto 
   TABLE DATA           m   COPY public.venta_producto (id_venta_producto, codigo_venta, codigo_producto, cantidad_producto) FROM stdin;
    public          postgres    false    229   l       a           0    0    cliente_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_id_usuario_seq', 5, true);
          public          postgres    false    215            b           0    0    comentario_id_comentario_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.comentario_id_comentario_seq', 25, true);
          public          postgres    false    217            c           0    0    compra_id_compra_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.compra_id_compra_seq', 118, true);
          public          postgres    false    219            d           0    0 &   compra_producto_id_compra_producto_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.compra_producto_id_compra_producto_seq', 45, true);
          public          postgres    false    221            e           0    0    imagen_producto_id_imagen_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.imagen_producto_id_imagen_seq', 365, true);
          public          postgres    false    223            f           0    0    nueva_secuencia    SEQUENCE SET     >   SELECT pg_catalog.setval('public.nueva_secuencia', 24, true);
          public          postgres    false    224            g           0    0    producto_id_producto_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.producto_id_producto_seq', 22, true);
          public          postgres    false    226            h           0    0    venta_id_venta_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.venta_id_venta_seq', 173, true);
          public          postgres    false    228            i           0    0 $   venta_producto_id_venta_producto_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.venta_producto_id_venta_producto_seq', 138, true);
          public          postgres    false    230            �           2606    17319    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    214            �           2606    17321    comentario comentario_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_pkey PRIMARY KEY (id_comentario);
 D   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_pkey;
       public            postgres    false    216            �           2606    17323    compra compra_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.compra
    ADD CONSTRAINT compra_pkey PRIMARY KEY (id_compra);
 <   ALTER TABLE ONLY public.compra DROP CONSTRAINT compra_pkey;
       public            postgres    false    218            �           2606    17325 $   compra_producto compra_producto_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_pkey PRIMARY KEY (id_compra_producto);
 N   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_pkey;
       public            postgres    false    220            �           2606    17327 $   imagen_producto imagen_producto_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_pkey PRIMARY KEY (id_imagen);
 N   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_pkey;
       public            postgres    false    222            �           2606    17329    producto producto_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);
 @   ALTER TABLE ONLY public.producto DROP CONSTRAINT producto_pkey;
       public            postgres    false    225            �           2606    17331    venta venta_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (id_venta);
 :   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_pkey;
       public            postgres    false    227            �           2606    17333 "   venta_producto venta_producto_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_pkey PRIMARY KEY (id_venta_producto);
 L   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_pkey;
       public            postgres    false    229            �           2606    17334 *   comentario comentario_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT comentario_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 T   ALTER TABLE ONLY public.comentario DROP CONSTRAINT comentario_codigo_producto_fkey;
       public          postgres    false    216    3238    225            �           2606    17339 2   compra_producto compra_producto_codigo_compra_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_compra_fkey FOREIGN KEY (codigo_compra) REFERENCES public.compra(id_compra);
 \   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_compra_fkey;
       public          postgres    false    220    3232    218            �           2606    17344 4   compra_producto compra_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.compra_producto
    ADD CONSTRAINT compra_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.compra_producto DROP CONSTRAINT compra_producto_codigo_producto_fkey;
       public          postgres    false    220    3238    225            �           2606    17349    comentario fk_codigo_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentario
    ADD CONSTRAINT fk_codigo_cliente FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 F   ALTER TABLE ONLY public.comentario DROP CONSTRAINT fk_codigo_cliente;
       public          postgres    false    216    3228    214            �           2606    17354 4   imagen_producto imagen_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.imagen_producto
    ADD CONSTRAINT imagen_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 ^   ALTER TABLE ONLY public.imagen_producto DROP CONSTRAINT imagen_producto_codigo_producto_fkey;
       public          postgres    false    222    225    3238            �           2606    17359    venta venta_codigo_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_codigo_cliente_fkey FOREIGN KEY (codigo_cliente) REFERENCES public.cliente(id_cliente);
 I   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_codigo_cliente_fkey;
       public          postgres    false    214    3228    227            �           2606    17364 2   venta_producto venta_producto_codigo_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_producto_fkey FOREIGN KEY (codigo_producto) REFERENCES public.producto(id_producto);
 \   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_producto_fkey;
       public          postgres    false    3238    225    229            �           2606    17369 /   venta_producto venta_producto_codigo_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta_producto
    ADD CONSTRAINT venta_producto_codigo_venta_fkey FOREIGN KEY (codigo_venta) REFERENCES public.venta(id_venta);
 Y   ALTER TABLE ONLY public.venta_producto DROP CONSTRAINT venta_producto_codigo_venta_fkey;
       public          postgres    false    3240    229    227            A   �   x�m�Mn� ���)z�0�ػVi��t)B�D`,�����r�hX�����>e7x���L��}����~m�46S�e�q,�|Qlg8�����J`R
�쌶��K�94m�Yr��1>���u�������֙ �W����F1�)^䍨���F�e������c��8��x�Wv�uT2�2���%Է�1�2�Z�Cz,�#&��� �j�Sl=r��M�#�3'}�!?���      C      x������ � �      E   �   x���K
!D�z�	V;:�]�B``�!˜>!+kS�������`��|�P�o�u��c��#<�q�_= �6���m�B��Z,��v	#[�dmds�l���$���,�2��\�l�u=RWu�6S��I! y�L�/$�j��4�r;������:y��lO
9�b��U)      G   {   x���	0ľ}Ô��<�K���*"�N�:2�vT�S�p̨n���R5q��W\�r�Zf
l�\�#�N���z2��02���d
�2	�,5	���B��Bn���;
!���#���#��c      I   �  x������6���S���2`�[vCesJjfR�!���z��xf'��i5`�,K-!r���/�OX�Z�Ir�m���tZVYZn�}�1�xI7�~��Ȋ���4xȪ��ϴ̃�2�>����x������ԛ;l��i���.��d�݉E�ez.�W�͹���̗���`w���|֙s��s���3����|���F�;���c�[�x�#�9�s�x���3/?�����	۹ۄf�t�/�K����5�'�m�l�2ak�UD��P�Ʉ-=J}/����y�v���y�ރ�[���}2!d
��(<�Ǫ�O����p9E.H���� �S䂔
=�RE.Hq�?� �P���Ϥ�m6���k��7U����G������M�Zpd���d��! ����ZP�gJy�PԂ��E��S�-��?#.g������W8[����v�Ҵ2DN�@�����8$g���nW��:��f�8D�c����gA�{�Yׂ�-p���3�`���. ��n�o����W�Ƣ;�\q���k�û�ʍ�_ӝ��]��iS��Ѫ���x����a�-U�<_�Dc��R������(�8��h���]��Tl�?�y^I,��L�Tl�w!`	��W��%ۥ����h���æV>�z�v���z!M��"r�pfJ�LI�DN�LK"Ӳc��ľ1���o��5�*x��V*�p!��W����N�<�h��3��d�C��N<�ˈy�a։'"�AQ�������A���e'"ugL�D�J���j8�D�^�A�__�4��}�R��
����PQ�����`ѭ�!�e�G��Z"���s.���M���
6�uY5ys�(�,?>8��`��(� r�@� �G����K`�������)�Y��H��<�\���E��Xr�2)������eR
�آ�2Ē�јc|ʗ�0��E��*9��HgQ��NΩF)�Y�6����F)ґ�z����>_Ou.������m��=_��ʽ#i�Y�6Hn�}��*W�6Hn�'|���ggr�TrY:|P��(�|Ӥ�e��*`��zh_ԛ�`Z���S��mۊ^͜����\[�o��r>+�M��k۶�+����4�ř-$������m��Vd�=��ԋ��܎��'Ҟ&� 5��zPc�6Ajz��/��>�	R�K[}j�rM��b?��Pw���(?l�q
�䑻.z��\�&�V�O���_;�����/|�<4��s�˞�p�ۿ�8G�/D+0u��I3�߲�!�ۥO"�����a�Y�F{�R�0��r	3Ρ���=#P������鑝�n|�gw�;�Zwӛ�����"KQj��9C�G `y��0rا���Q���pK+F@�#@��L# 9Į!cY��T�[�ʴ����U����mP�{S�r�q !�W_$��t5����7��5;�Q����<U(j@���d2�;^-      L   �  x��X�n�6]+_��Z 1l'�$�I&��E��]tCQ��Z�P��o��bEw]�?�sI=(�r�`����8�R��^	%�,9[S��˵dw����ⱗL��8[�_?W
�D2�Kì��V2�8Q�����rn��UY�-�X&?��K.-�
ř�X��Қ�mY)-6°4��&�lu����J��L��D��)��L�g��2Z�_�m��Ǎ9��M.�����Dr�� �W��SwƇ�{?Ee��[셙�(qv�Z��fĦX�L��yk�e���ղd��&c���Ƽ��l>�_Fڰ�ߺTkC�RdF�t��ўWГ��\�'lQ1Q�Ě�w�m���+&+J[����(�0�/��U�,mA�<��v�趏�=�	�U���4U�[���,|��Oٯ�.2-���X�`"P�3��2�-@�Xn%�_�_��#
�\#wx��$��[�Z��:��#,��_-~���'ɞ�nWG���R����m�ҡ��T<�q����P	Ojg��&
�z��(����a��z$���sr8�f���7��<��庨�^���U��;U6�^GT���,1K+E/����U|�zV�����9�Q�E�W�5_e푮bD:�T�ųF�M��Syģ���0(oSE�ph9H�� ]@umX)5��+	l�W�4kYZ�.��H(���9��Ī�q(�0@R����]�C:��W)�e�����w�>�
ۨ���G��|�����'b;�a�X��UA�\IG}����}�g
��G���(�L�s�y�71CL���t�%��)�����hs�@,h{�$+��)�p���E��4!�3�΅7����L%I�4�A�x=����D)�u�7OF|긼}��:$��R��VGٝ�?�G!m�Eܳ����A,�(P,<*U]f a�		�v*G��c������?;���:��D����g�9��bu�5ye�V��n�o�U�mxA��IdW�oN�K��< �H"��I��KN|�hF5� 2���J���|R��mZ�D��j�"@��'`	�sR$��7(UF�X�n�6�
�Ct����� f>�����?����o��ۮ�c)�<QYuN4�6(O 0>�ڦ4�v)yM�[��2sMr?.���zD��a���s#���¦�����fx�Y~@>!�@�R��������V���9`:Հ,�4 ?����m�X�2��Q>^����ڨ�R��
�xG����@���X�#v������i��7c���Zy䞂���Y�@�ó��t��.f�%5�Θ�ľ6u����쥿&�K�WG�#n���XD�?;w�jj�A�H�RKlKC�M��;3���Z	 a{���cq�R`���^MkF $z�#�R�.��ɇqh�d�^K��}�K[_J�Z�a�̧��G�d�r�b^�؊����!GKӍ�s��)���R&Vr����.p�rA65������z�/]��1H����v{P^r�0�P<^ �nB�>`ޢ�2�1T;?��;� #��a�h�Y���M�y��Rs�3i:Sho��cwO{�O|�8 6����;k�[_,4�[�&x���MS�h��#����������P����
w8�*�s��vWfb�� *m�N��k��eE�r4��ņ3�ɯz_�Ax;
����ٿ�fr�      R   �   x�m��� �7��N��^��u� �	;#�D+RT�]�/����v#�=���NhF�AO�e/�y����	�@v5M�J�g�A�r��
�)��_��p���H���ȹ�ܘ!�C��rpp�x��U�O���XW�-~��B
{��C�V�~j�?QvZn      N      x������ � �      P      x������ � �     