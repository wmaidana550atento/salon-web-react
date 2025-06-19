import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar, Clock, User, Star, Gift, Scissors, Sparkles, Droplet, Sun, Moon, MapPin, Phone, Mail, ChevronDown, Menu, X, QrCode as QrCodeIcon, UserCircle, LogIn, Award, CheckCircle, ShoppingCart, Trash2, Plus, Minus, Package, Truck, Store, BarChart2, Users, Settings, UploadCloud, Edit, FileSpreadsheet, Eye, EyeOff, Crown, Heart, Image as ImageIcon, ShieldCheck, MailWarning, Facebook, Instagram } from 'lucide-react';

// --- MOCK DATA ---

const initialProducts = [
    { id: 1, name: 'Sérum Facial Hidratante', description: 'Sérum com ácido hialurónico para uma hidratação profunda e duradoura. Ideal para todos os tipos de pele.', price: 29.99, stock: 15, image: 'https://images.unsplash.com/photo-1620916566398-39f168a7673b?q=80&w=1587&auto=format&fit=crop' },
    { id: 2, name: 'Máscara Capilar Reconstrutora', description: 'Tratamento intensivo que repara e fortalece o cabelo danificado, devolvendo o brilho e a suavidade.', price: 19.50, stock: 25, image: 'https://images.unsplash.com/photo-1552046246-a53422039989?q=80&w=1587&auto=format&fit=crop' },
    { id: 3, name: 'Creme de Mãos Nutritivo', description: 'Creme com manteiga de karité que nutre e protege as mãos, deixando-as macias e sem sensação oleosa.', price: 12.00, stock: 4, image: 'https://images.unsplash.com/photo-1629198735660-e39ea93f5c6e?q=80&w=1587&auto=format&fit=crop' },
    { id: 4, name: 'Óleo Essencial de Lavanda', description: 'Óleo 100% puro com propriedades relaxantes. Perfeito para aromaterapia ou para adicionar ao banho.', price: 15.90, stock: 8, image: 'https://images.unsplash.com/photo-1627993093257-85347e753995?q=80&w=1587&auto=format&fit=crop' },
    { id: 5, name: 'Batom Líquido Matte (Cor "Pétala")', description: 'Batom de longa duração com acabamento matte aveludado. Cor rosa nude universal.', price: 22.00, stock: 0, image: 'https://images.unsplash.com/photo-1590155288939-65476a31248c?q=80&w=1587&auto=format&fit=crop' },
    { id: 6, name: 'Paleta de Sombras "Terra"', description: 'Inclui 12 tons terrosos com acabamentos matte e cintilantes para criar looks versáteis.', price: 48.00, stock: 12, image: 'https://images.unsplash.com/photo-1583244274945-2135c34e34c9?q=80&w=1587&auto=format&fit=crop' }
];

// --- i18n (Internationalization) Configuration ---
const translations = {
  pt: {
    nav: {
      home: 'Início',
      services: 'Serviços',
      book: 'Agendar',
      shop: 'Loja', 
      blog: 'Blog',
      contact: 'Contacto',
      login: 'Iniciar Sessão',
      admin: 'Admin',
    },
    hero: {
      title: 'Y & W Salão de Beleza',
      subtitle: 'Sistema de pontos e fidelização para o seu centro de estética',
      button_start: 'Começar',
      button_more: 'Saber mais',
      features_title: "Características Incríveis",
      features_subtitle: "Descubra tudo o que o nosso sistema de pontos pode fazer por si"
    },
    feature_cards: [
        { title: "Ganha Pontos", description: "Acumula pontos com cada serviço e obtém descontos incríveis", icon: "Star" },
        { title: "Reserva Citas", description: "Agenda os teus serviços de beleza de forma fácil e rápida", icon: "Calendar" },
        { title: "Ofertas Exclusivas", description: "Acede a promoções especiais só para membros", icon: "Gift" }
    ],
    services: {
      title: 'Nossos Serviços',
      subtitle: 'Descubra a nossa ampla gama de serviços de beleza e estética. Cada serviço oferece pontos que pode trocar por descontos incríveis.',
      hair: 'Serviços de Cabeleireiro',
      hair_subtitle: 'Serviços profissionais para o cuidado e estilo do seu cabelo',
      aesthetics: 'Serviços de Estética',
      aesthetics_subtitle: 'Tratamentos de beleza e bem-estar para cuidar do seu rosto e corpo e relaxar',
      price: 'Preço',
      points: 'pontos',
      book_service: 'Reservar Serviço',
      hair_services: [
        { id: 1, name: 'Corte de Cabelo', description: 'Adaptado a diferentes tipos de cabelo e estilos', price: 25, points: 1, icon: 'Scissors' },
        { id: 2, name: 'Coloração e Decoloração', description: 'Inclui madeixas, balayage, californianas, ombré hair', price: 45, points: 2, icon: 'Sparkles' },
        { id: 3, name: 'Tratamentos Capilares', description: 'Hidratação, alisamento, permanente', price: 35, points: 2, icon: 'Droplet' },
        { id: 4, name: 'Penteados', description: 'Para ocasiões especiais ou para o dia a dia', price: 20, points: 1, icon: 'Gift' },
      ],
      aesthetics_services: [
        { id: 5, name: 'Limpeza Facial', description: 'Para eliminar impurezas e melhorar a aparência da pele', price: 40, points: 2, icon: 'Sun' },
        { id: 6, name: 'Depilação', description: 'Com diferentes métodos como cera ou laser', price: 15, points: 1, icon: 'Moon' },
        { id: 7, name: 'Massagem', description: 'Massagem facial e corporal para relaxar e revitalizar', price: 50, points: 2, icon: 'User' },
        { id: 8, name: 'Maquilhagem', description: 'Para eventos ou para o uso diário', price: 30, points: 2, icon: 'ImageIcon' },
        { id: 9, name: 'Manicura e Pedicura', description: 'Com unhas de gel, verniz gel, verniz normal', price: 25, points: 1, icon: 'Star' },
        { id: 10, name: 'Tratamentos Anti-idade', description: 'Tratamentos para o rosto e o corpo', price: 80, points: 3, icon: 'Heart' },
      ],
    },
    points_system: {
        title: 'Sistema de Pontos',
        description: 'Acumula 30 pontos e obtém 5€ de desconto na tua próxima visita!',
        basic: '1 ponto = Serviços básicos',
        premium: '2 pontos = Serviços premium',
        luxury: '3 pontos = Serviços de luxo',
    },
    booking: {
        title: 'Faça a sua Marcação',
        step1: '1. Escolha o Serviço',
        step2: '2. Escolha o Profissional',
        step3: '3. Escolha a Data e Hora',
        select_service: 'Selecione um serviço...',
        select_professional: 'Selecione um profissional...',
        any_professional: 'Qualquer Profissional',
        professionals: ['Edite', 'Sofia', 'Carla'],
        next: 'Seguinte',
        back: 'Anterior',
        confirm: 'Confirmar Agendamento',
        success_title: 'Agendamento Confirmado!',
        success_message: 'Receberá um e-mail com os detalhes da sua marcação. Obrigado por escolher o nosso centro!',
        availability_for: 'Disponibilidade para',
        on: 'em',
    },
    client_dashboard: {
        title: 'Bem-vinda, Ana!',
        subtitle: 'A sua área pessoal de beleza e bem-estar.',
        my_profile: 'O Meu Perfil',
        my_bookings: 'As Minhas Marcações',
        loyalty: 'Pontos de Fidelidade',
        logout: 'Sair',
        profile_details: {
            title: 'Detalhes do Perfil',
            name: 'Nome Completo',
            email: 'Email',
            phone: 'Telefone',
            nif: 'NIF/Passaporte',
        },
        loyalty_status: {
            title: 'Programa de Fidelidade',
            points: 'Os seus Pontos',
            progress: 'Progresso para o próximo prémio',
            goal: 'serviços para um desconto de 5€',
            reward_ready: 'Parabéns! Tem um prémio!',
            reward_description: 'Ganhou um desconto de 5€ na sua próxima visita. Mostre este código QR no balcão para o utilizar.',
            generate_qr: 'Gerar QR Code do Desconto',
            qr_code_title: 'O seu Desconto de 5€',
        },
        upcoming_booking: 'Próxima Marcação',
        no_upcoming_booking: 'Sem marcações futuras.',
        service: 'Serviço',
        professional: 'Profissional',
        date: 'Data',
    },
    blog: {
      title: 'Conselhos de Beleza',
      posts: [
        { title: '5 Dicas para um Cabelo Saudável no Verão', excerpt: 'O sol, o cloro e o sal podem danificar o seu cabelo. Aprenda a protegê-lo com estas dicas simples...', image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=874&auto=format&fit=crop' },
        { title: 'A Importância da Limpeza de Pele Profissional', excerpt: 'Descubra por que uma limpeza de pele regular é fundamental para uma pele radiante e livre de imperfeições.', image: 'https://images.unsplash.com/photo-1512290923902-8a9f31c83659?q=80&w=874&auto=format&fit=crop' },
        { title: 'Tendências de Manicure para 2025', excerpt: 'Das cores vibrantes aos designs minimalistas, veja o que vai estar na moda para as suas unhas.', image: 'https://images.unsplash.com/photo-1604948892147-7b794a1074e5?q=80&w=870&auto=format&fit=crop' },
      ],
      read_more: 'Ler Mais',
    },
    contact: {
      title: 'Entre em Contacto',
      subtitle: 'Tem alguma questão? Adoraríamos falar consigo. Preencha o formulário ou use os nossos contactos diretos.',
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      send: 'Enviar Mensagem',
      success: 'Mensagem enviada com sucesso!',
      error: 'Ocorreu um erro. Tente novamente.',
      direct_contact: 'Contacto Direto',
      address: 'Rua da Beleza, 123, 1000-001 Lisboa, Portugal',
    },
    footer: {
      about: 'Sobre nós',
      description: 'O seu refúgio de beleza e bem-estar, dedicado a realçar a sua elegância natural com serviços de excelência.',
      follow: 'Siga-nos',
    },
    shop: {
      title: 'A Nossa Loja Exclusiva',
      subtitle: 'Leve um pouco do nosso bem-estar para casa consigo.',
      add_to_cart: 'Adicionar',
      out_of_stock: 'Esgotado',
      view_product: 'Ver Detalhes',
      in_stock: 'Em Stock',
      go_to_cart: 'Ir para o Carrinho',
      continue_shopping: 'Continuar a Comprar',
      item_added: 'Produto adicionado ao carrinho!',
      cart_title: 'O seu Carrinho',
      empty_cart: 'O seu carrinho está vazio.',
      product: 'Produto',
      quantity: 'Quantidade',
      price: 'Preço',
      total: 'Total',
      checkout: 'Finalizar Reserva',
      checkout_title: 'Finalizar a sua Reserva',
      delivery_method: 'Escolha o método de entrega',
      pickup: 'Retirar no salão',
      delivery: 'Envio a domicílio',
      confirm_reservation: 'Confirmar Reserva',
      reservation_confirmed: 'Reserva Confirmada!',
      pickup_message: "¡Obrigado pela sua reserva! Pode passar pelo salão para realizar o pagamento e retirar o seu produto.",
      delivery_message_prefix: "A sua reserva está confirmada. O pagamento deve ser realizado via MB Way. O valor total de",
      delivery_message_suffix: "inclui o preço do produto mais um custo de envio de 8€ (válido até 8 km). Para distâncias superiores, o custo será calculado automaticamente.",
      points_earned: 'Ganhou',
      points: 'pontos com esta compra!',
    },
    admin_page: {
        title: 'Painel de Administração',
        login_title: 'Acesso Restrito',
        login_button: 'Entrar',
        username: 'Utilizador',
        password: 'Senha',
        login_error: 'Credenciais inválidas (protótipo: pode entrar com qualquer dado).',
        dashboard: 'Dashboard',
        products: 'Produtos',
        settings: 'Configurações',
        users: 'Utilizadores',
        shop_visibility_label: 'Ativar a Loja Online para clientes',
        shop_enabled: 'A loja está agora visível para todos os clientes.',
        shop_disabled: 'A loja está agora oculta para os clientes.',
        product_management: 'Gestão de Produtos',
        add_product: 'Adicionar Produto',
        import_sheets: 'Importar do Google Sheets',
        import_sheets_desc: 'Sincroniza automaticamente a cada 15 min.',
        product_table: {
            name: 'Nome',
            price: 'Preço',
            stock: 'Stock',
            actions: 'Ações'
        },
        low_stock_alert: 'Produtos com Stock Baixo',
        sales_overview: 'Visão Geral das Vendas',
        super_admin_toggle: 'Modo Super Admin',
        user_management_placeholder: 'A gestão de utilizadores requer um backend e só está disponível para Super Admins.'
    },
    login_page: {
        client_title: 'Acesso de Cliente',
        client_subtitle: 'Introduza as suas credenciais para aceder',
        email_placeholder: 'o-seu@email.com',
        password: 'Senha',
        forgot_password: 'Esqueceu-se da senha?',
        login_button: 'Iniciar Sessão',
        no_account: 'Não tem uma conta?',
        register_here: 'Registe-se aqui',
        admin_title: 'Acesso de Administrador',
        admin_subtitle: '(Apenas para uso interno)',
        admin_login_button: 'Entrar como Administrador',
        invalid_credentials: 'Email ou senha inválidos'
    },
    register_page: {
        title: "Criar a sua Conta",
        subtitle: "Preencha os seus dados para começar.",
        full_name: "Nome Completo",
        email: "Email",
        phone: "Telefone",
        nif: "NIF / Passaporte",
        password: "Senha",
        confirm_password: "Confirmar Senha",
        register_button: "Registar",
        already_have_account: "Já tem uma conta?",
        login_here: "Inicie sessão",
        passwords_do_not_match: "As senhas não coincidem.",
        registration_success: "Registo efetuado com sucesso! Será redirecionado para o acesso."
    },
    auth_modal: {
        login_title: "Acesso Necessário",
        login_message: "Para reservar um serviço ou comprar produtos, por favor inicie sessão ou registe uma conta.",
        verify_title: "Verifique o seu Email",
        verify_message: "Para continuar, por favor confirme a sua conta através do link que enviámos para o seu email.",
        resend_email: "Reenviar email de confirmação",
        email_sent: "Email de confirmação reenviado!",
        close: "Fechar"
    }
  },
  es: {
    nav: {
        home: 'Inicio',
        services: 'Servicios',
        book: 'Agendar',
        shop: 'Tienda',
        blog: 'Blog',
        contact: 'Contacto',
        login: 'Iniciar Sesión',
        admin: 'Admin',
    },
    hero: {
      title: 'Y & W Salón de Belleza',
      subtitle: 'Sistema de puntos y fidelización para tu centro de estética',
      button_start: 'Comenzar',
      button_more: 'Saber más',
      features_title: "Características Increíbles",
      features_subtitle: "Descubre todo lo que nuestro sistema de puntos puede hacer por ti"
    },
    feature_cards: [
        { title: "Gana Puntos", description: "Acumula puntos con cada servicio y obtén descuentos increíbles", icon: "Star" },
        { title: "Reserva Citas", description: "Agenda tus servicios de belleza de forma fácil y rápida", icon: "Calendar" },
        { title: "Ofertas Exclusivas", description: "Accede a promociones especiales solo para miembros", icon: "Gift" }
    ],
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Descubre nuestra amplia gama de servicios de belleza y estética. Cada servicio te otorga puntos que puedes canjear por descuentos increíbles.',
      hair: 'Servicios de Peluquería',
      hair_subtitle: 'Servicios profesionales para el cuidado y estilismo de tu cabello',
      aesthetics: 'Servicios de Estética',
      aesthetics_subtitle: 'Tratamientos de belleza y bienestar para cuidar tu rostro y cuerpo y relajarte',
      price: 'Precio',
      points: 'puntos',
      book_service: 'Reservar Servicio',
       hair_services: [
        { id: 1, name: 'Corte de Cabello', description: 'Adaptado a diferentes tipos de cabello y estilos', price: 25, points: 1, icon: 'Scissors' },
        { id: 2, name: 'Coloración y Decoloración', description: 'Incluye tinte, balayage, californianas, ombré hair', price: 45, points: 2, icon: 'Sparkles' },
        { id: 3, name: 'Tratamientos Capilares', description: 'Hidratación, alisamiento, permanente', price: 35, points: 2, icon: 'Droplet' },
        { id: 4, name: 'Peinados', description: 'Para ocasiones especiales o para el día a día', price: 20, points: 1, icon: 'Gift' },
      ],
      aesthetics_services: [
        { id: 5, name: 'Limpieza Facial', description: 'Para eliminar impurezas y mejorar la apariencia de la piel', price: 40, points: 2, icon: 'Sun' },
        { id: 6, name: 'Depilación', description: 'Con diferentes métodos como cera o láser', price: 15, points: 1, icon: 'Moon' },
        { id: 7, name: 'Masaje', description: 'Masaje facial y corporal para relajar y revitalizar', price: 50, points: 2, icon: 'User' },
        { id: 8, name: 'Maquillaje', description: 'Para eventos o para el uso diario', price: 30, points: 2, icon: 'ImageIcon' },
        { id: 9, name: 'Manicura y Pedicura', description: 'Con uñas de gel, barniz gel, barniz normal', price: 25, points: 1, icon: 'Star' },
        { id: 10, name: 'Tratamientos Anti-edad', description: 'Tratamientos para el rostro y el cuerpo', price: 80, points: 3, icon: 'Heart' },
      ],
    },
    points_system: {
        title: 'Sistema de Puntos',
        description: '¡Acumula 30 puntos y obtén 5€ de descuento en tu próxima visita!',
        basic: '1 punto = Servicios básicos',
        premium: '2 puntos = Servicios premium',
        luxury: '3 puntos = Servicios de lujo',
    },
    booking: {
        title: 'Haz tu Reserva',
        step1: '1. Elige el Servicio',
        step2: '2. Elige al Profesional',
        step3: '3. Elige la Fecha y Hora',
        select_service: 'Selecciona un servicio...',
        select_professional: 'Selecciona un profesional...',
        any_professional: 'Cualquier Profesional',
        professionals: ['Edite', 'Sofía', 'Carla'],
        next: 'Siguiente',
        back: 'Anterior',
        confirm: 'Confirmar Reserva',
        success_title: '¡Reserva Confirmada!',
        success_message: 'Recibirás un email con los detalles de tu cita. ¡Gracias por elegir nuestro centro!',
        availability_for: 'Disponibilidad para',
        on: 'el',
    },
    client_dashboard: {
        title: '¡Bienvenida, Ana!',
        subtitle: 'Tu área personal de belleza y bienestar.',
        my_profile: 'Mi Perfil',
        my_bookings: 'Mis Reservas',
        loyalty: 'Puntos de Fidelidad',
        logout: 'Salir',
        profile_details: {
            title: 'Detalles del Perfil',
            name: 'Nombre Completo',
            email: 'Email',
            phone: 'Teléfono',
            nif: 'NIF/Pasaporte',
        },
        loyalty_status: {
            title: 'Programa de Fidelidad',
            points: 'Tus Puntos',
            progress: 'Progreso para el próximo premio',
            goal: 'servicios para un descuento de 5€',
            reward_ready: '¡Enhorabuena! ¡Tienes un premio!',
            reward_description: 'Has ganado un descuento de 5€ en tu próxima visita. Muestra este código QR en el mostrador para utilizarlo.',
            generate_qr: 'Generar QR del Descuento',
            qr_code_title: 'Tu Descuento de 5€',
        },
        upcoming_booking: 'Próxima Reserva',
        no_upcoming_booking: 'Sin reservas futuras.',
        service: 'Servicio',
        professional: 'Profesional',
        date: 'Fecha',
    },
    blog: {
      title: 'Consejos de Belleza',
      posts: [
        { title: '5 Consejos para un Cabello Sano en Verano', excerpt: 'El sol, el cloro y la sal pueden dañar tu cabello. Aprende a protegerlo con estos sencillos consejos...', image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=874&auto=format&fit=crop' },
        { title: 'La Importancia de la Limpieza Facial Profesional', excerpt: 'Descubre por qué una limpieza facial regular es clave para una piel radiante y libre de imperfecciones.', image: 'https://images.unsplash.com/photo-1512290923902-8a9f31c83659?q=80&w=874&auto=format&fit=crop' },
        { title: 'Tendencias de Manicura para 2025', excerpt: 'De los colores vibrantes a los diseños minimalistas, mira lo que estará de moda para tus uñas.', image: 'https://images.unsplash.com/photo-1604948892147-7b794a1074e5?q=80&w=870&auto=format&fit=crop' },
      ],
      read_more: 'Leer Más',
    },
    contact: {
      title: 'Ponte en Contacto',
      subtitle: '¿Tienes alguna pregunta? Nos encantaría hablar contigo. Rellena el formulario o utiliza nuestros contactos directos.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
      success: '¡Mensaje enviado con éxito!',
      error: 'Ocurrió un error. Inténtalo de nuevo.',
      direct_contact: 'Contacto Directo',
      address: 'Calle de la Belleza, 123, 1000-001 Lisboa, Portugal',
    },
    footer: {
      about: 'Sobre nosotros',
      description: 'Tu refugio de belleza y bienestar, dedicado a realzar tu elegancia natural con servicios de excelencia.',
      follow: 'Síguenos',
    },
    shop: {
      title: 'Nuestra Tienda Exclusiva',
      subtitle: 'Llévate un poco de nuestro bienestar a casa contigo.',
      add_to_cart: 'Añadir',
      out_of_stock: 'Agotado',
      view_product: 'Ver Detalles',
      in_stock: 'En Stock',
      go_to_cart: 'Ir al Carrito',
      continue_shopping: 'Seguir Comprando',
      item_added: '¡Producto añadido al carrito!',
      cart_title: 'Tu Carrito',
      empty_cart: 'Tu carrito está vacío.',
      product: 'Producto',
      quantity: 'Cantidad',
      price: 'Precio',
      total: 'Total',
      checkout: 'Finalizar Reserva',
      checkout_title: 'Finalizar tu Reserva',
      delivery_method: 'Elige el método de entrega',
      pickup: 'Retiro en el salón',
      delivery: 'Envío a domicilio',
      confirm_reservation: 'Confirmar Reserva',
      reservation_confirmed: '¡Reserva Confirmada!',
      pickup_message: "¡Gracias por tu reserva! Puedes pasar por el salón para realizar el pago y retirar tu producto.",
      delivery_message_prefix: "Tu reserva está confirmada. El pago debe realizarse vía MB Way. El valor total de",
      delivery_message_suffix: "incluye el precio del producto más un coste de envío de 8€ (válido hasta 8 km). Para distancias superiores, el coste será calculado automáticamente según la plataforma de entrega (Uber o Bolt).",
      points_earned: '¡Has ganado',
      points: 'puntos con esta compra!',
    },
    admin_page: {
        title: 'Panel de Administración',
        login_title: 'Acceso Restringido',
        login_button: 'Entrar',
        username: 'Usuario',
        password: 'Contraseña',
        login_error: 'Credenciales inválidas (prototipo: puede entrar con cualquier dato).',
        dashboard: 'Dashboard',
        products: 'Productos',
        settings: 'Configuración',
        users: 'Usuarios',
        shop_visibility_label: 'Activar la Tienda Online para clientes',
        shop_enabled: 'La tienda está ahora visible para todos los clientes.',
        shop_disabled: 'La tienda está ahora oculta para los clientes.',
        product_management: 'Gestión de Productos',
        add_product: 'Añadir Producto',
        import_sheets: 'Importar de Google Sheets',
        import_sheets_desc: 'Sincronización automática cada 15 min.',
        product_table: {
            name: 'Nombre',
            price: 'Precio',
            stock: 'Stock',
            actions: 'Acciones'
        },
        low_stock_alert: 'Productos con Stock Bajo',
        sales_overview: 'Resumen de Ventas',
        super_admin_toggle: 'Modo Super Admin',
        user_management_placeholder: 'La gestión de usuarios requiere un backend y solo está disponible para Super Admins.'
    },
    login_page: {
        client_title: 'Acceso de Cliente',
        client_subtitle: 'Ingresa tus credenciales para acceder',
        email_placeholder: 'tu@email.com',
        password: 'Contraseña',
        forgot_password: '¿Olvidaste tu contraseña?',
        login_button: 'Iniciar Sesión',
        no_account: '¿No tienes una cuenta?',
        register_here: 'Regístrate aquí',
        admin_title: 'Acceso de Administrador',
        admin_subtitle: '(Solo para uso interno)',
        admin_login_button: 'Entrar como Administrador',
        invalid_credentials: 'Email o contraseña inválidos'
    },
    register_page: {
        title: "Crear tu Cuenta",
        subtitle: "Rellena tus datos para empezar.",
        full_name: "Nombre Completo",
        email: "Email",
        phone: "Teléfono",
        nif: "NIF / Pasaporte",
        password: "Contraseña",
        confirm_password: "Confirmar Contraseña",
        register_button: "Registrar",
        already_have_account: "¿Ya tienes una cuenta?",
        login_here: "Inicia sesión",
        passwords_do_not_match: "Las contraseñas no coinciden.",
        registration_success: "¡Registro completado con éxito! Serás redirigido al login."
    },
    auth_modal: {
        login_title: "Acceso Requerido",
        login_message: "Para reservar un servicio o comprar productos, por favor inicia sesión o registra una cuenta.",
        verify_title: "Verifica tu Email",
        verify_message: "Para continuar, por favor confirma tu cuenta usando el enlace enviado a tu dirección de email.",
        resend_email: "Reenviar email de confirmación",
        email_sent: "¡Email de confirmación reenviado!",
        close: "Cerrar"
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      book: 'Book Now',
      shop: 'Shop',
      blog: 'Blog',
      contact: 'Contact',
      login: 'Login',
      admin: 'Admin',
    },
    hero: {
      title: 'Y & W Beauty Salon',
      subtitle: 'Loyalty and points system for your beauty center',
      button_start: 'Get Started',
      button_more: 'Learn more',
      features_title: "Incredible Features",
      features_subtitle: "Discover everything our points system can do for you"
    },
    feature_cards: [
        { title: "Earn Points", description: "Collect points with each service and get incredible discounts", icon: "Star" },
        { title: "Book Appointments", description: "Schedule your beauty services easily and quickly", icon: "Calendar" },
        { title: "Exclusive Offers", description: "Access special promotions only for members", icon: "Gift" }
    ],
    services: {
      title: 'Our Services',
      subtitle: 'Discover our wide range of beauty and aesthetic services. Each service earns you points you can redeem for incredible discounts.',
      hair: 'Hairdressing Services',
      hair_subtitle: 'Professional services for the care and styling of your hair',
      aesthetics: 'Aesthetic Services',
      aesthetics_subtitle: 'Beauty and wellness treatments to care for your face and body and to relax',
      price: 'Price',
      points: 'points',
      book_service: 'Book Service',
       hair_services: [
        { id: 1, name: 'Haircut', description: 'Adapted to different hair types and styles', price: 25, points: 1, icon: 'Scissors' },
        { id: 2, name: 'Coloring & Highlights', description: 'Includes color, balayage, ombre hair', price: 45, points: 2, icon: 'Sparkles' },
        { id: 3, name: 'Hair Treatments', description: 'Hydration, straightening, permanent wave', price: 35, points: 2, icon: 'Droplet' },
        { id: 4, name: 'Hairstyling', description: 'For special occasions or everyday looks', price: 20, points: 1, icon: 'Gift' },
      ],
      aesthetics_services: [
        { id: 5, name: 'Facial Cleansing', description: 'To remove impurities and improve skin appearance', price: 40, points: 2, icon: 'Sun' },
        { id: 6, name: 'Waxing', description: 'With different methods like wax or laser', price: 15, points: 1, icon: 'Moon' },
        { id: 7, name: 'Massage', description: 'Facial and body massage to relax and revitalize', price: 50, points: 2, icon: 'User' },
        { id: 8, name: 'Makeup', description: 'For events or daily use', price: 30, points: 2, icon: 'ImageIcon' },
        { id: 9, name: 'Manicure & Pedicure', description: 'With gel nails, gel polish, regular polish', price: 25, points: 1, icon: 'Star' },
        { id: 10, name: 'Anti-aging Treatments', description: 'Treatments for face and body', price: 80, points: 3, icon: 'Heart' },
      ],
    },
    points_system: {
        title: 'Points System',
        description: 'Collect 30 points and get a 5€ discount on your next visit!',
        basic: '1 point = Basic services',
        premium: '2 points = Premium services',
        luxury: '3 points = Luxury services',
    },
    booking: {
        title: 'Make your Appointment',
        step1: '1. Choose Service',
        step2: '2. Choose Professional',
        step3: '3. Choose Date & Time',
        select_service: 'Select a service...',
        select_professional: 'Select a professional...',
        any_professional: 'Any Professional',
        professionals: ['Edite', 'Sophia', 'Carla'],
        next: 'Next',
        back: 'Back',
        confirm: 'Confirm Booking',
        success_title: 'Booking Confirmed!',
        success_message: 'You will receive an email with your appointment details. Thank you for choosing our center!',
        availability_for: 'Availability for',
        on: 'on',
    },
    client_dashboard: {
        title: 'Welcome, Ana!',
        subtitle: 'Your personal area for beauty and well-being.',
        my_profile: 'My Profile',
        my_bookings: 'My Bookings',
        loyalty: 'Loyalty Points',
        logout: 'Logout',
        profile_details: {
            title: 'Profile Details',
            name: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            nif: 'ID/Passport',
        },
        loyalty_status: {
            title: 'Loyalty Program',
            points: 'Your Points',
            progress: 'Progress to next reward',
            goal: 'services for a 5€ discount',
            reward_ready: 'Congratulations! You have a reward!',
            reward_description: 'You have earned a 5€ discount on your next visit. Show this QR code at the counter to redeem it.',
            generate_qr: 'Generate Discount QR Code',
            qr_code_title: 'Your 5€ Discount',
        },
        upcoming_booking: 'Next Booking',
        no_upcoming_booking: 'No upcoming bookings.',
        service: 'Service',
        professional: 'Professional',
        date: 'Date',
    },
    blog: {
      title: 'Beauty Tips',
      posts: [
        { title: '5 Tips for Healthy Hair in Summer', excerpt: 'The sun, chlorine, and salt can damage your hair. Learn how to protect it with these simple tips...', image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?q=80&w=874&auto=format&fit=crop' },
        { title: 'The Importance of Professional Facial Cleansing', excerpt: 'Discover why regular facial cleansing is key to radiant, flawless skin.', image: 'https://images.unsplash.com/photo-1512290923902-8a9f31c83659?q=80&w=874&auto=format&fit=crop' },
        { title: 'Manicure Trends for 2025', excerpt: 'From vibrant colors to minimalist designs, see what\'s in fashion for your nails.', image: 'https://images.unsplash.com/photo-1604948892147-7b794a1074e5?q=80&w=870&auto=format&fit=crop' },
      ],
      read_more: 'Read More',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have a question? We\'d love to hear from you. Fill out the form or use our direct contacts.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message sent successfully!',
      error: 'An error occurred. Please try again.',
      direct_contact: 'Direct Contact',
      address: 'Beauty Street, 123, 1000-001 Lisbon, Portugal',
    },
    footer: {
      about: 'About us',
      description: 'Your sanctuary for beauty and well-being, dedicated to enhancing your natural elegance with excellent services.',
      follow: 'Follow us',
    },
    shop: {
      title: 'Our Exclusive Shop',
      subtitle: 'Take a piece of our well-being home with you.',
      add_to_cart: 'Add to Cart',
      out_of_stock: 'Out of Stock',
      view_product: 'View Details',
      in_stock: 'In Stock',
      go_to_cart: 'Go to Cart',
      continue_shopping: 'Continue Shopping',
      item_added: 'Product added to cart!',
      cart_title: 'Your Cart',
      empty_cart: 'Your cart is empty.',
      product: 'Product',
      quantity: 'Quantity',
      price: 'Price',
      total: 'Total',
      checkout: 'Checkout',
      checkout_title: 'Finalize Your Reservation',
      delivery_method: 'Choose delivery method',
      pickup: 'Pick up at the salon',
      delivery: 'Home delivery',
      confirm_reservation: 'Confirm Reservation',
      reservation_confirmed: 'Reservation Confirmed!',
      pickup_message: "Thank you for your reservation! You can stop by the salon to make the payment and pick up your product.",
      delivery_message_prefix: "Your reservation is confirmed. Payment must be made via MB Way. The total amount of",
      delivery_message_suffix: "includes the product price plus a shipping cost of 8€ (valid up to 8 km). For longer distances, the cost will be calculated automatically.",
      points_earned: 'You have earned',
      points: 'points with this purchase!',
    },
    admin_page: {
        title: 'Admin Panel',
        login_title: 'Restricted Access',
        login_button: 'Login',
        username: 'Username',
        password: 'Password',
        login_error: 'Invalid credentials (prototype: you can log in with any data).',
        dashboard: 'Dashboard',
        products: 'Products',
        settings: 'Settings',
        users: 'Users',
        shop_visibility_label: 'Activate Online Shop for customers',
        shop_enabled: 'The shop is now visible to all customers.',
        shop_disabled: 'The shop is now hidden from customers.',
        product_management: 'Product Management',
        add_product: 'Add Product',
        import_sheets: 'Import from Google Sheets',
        import_sheets_desc: 'Auto-syncs every 15 minutes.',
        product_table: {
            name: 'Name',
            price: 'Price',
            stock: 'Stock',
            actions: 'Actions'
        },
        low_stock_alert: 'Low Stock Products',
        sales_overview: 'Sales Overview',
        super_admin_toggle: 'Super Admin Mode',
        user_management_placeholder: 'User management requires a backend and is only available to Super Admins.'
    },
    login_page: {
        client_title: 'Client Access',
        client_subtitle: 'Enter your credentials to access',
        email_placeholder: 'your@email.com',
        password: 'Password',
        forgot_password: 'Forgot your password?',
        login_button: 'Login',
        no_account: 'Don\'t have an account?',
        register_here: 'Register here',
        admin_title: 'Administrator Access',
        admin_subtitle: '(For internal use only)',
        admin_login_button: 'Enter as Administrator',
        invalid_credentials: 'Invalid email or password'
    },
    register_page: {
        title: "Create Your Account",
        subtitle: "Fill in your details to get started.",
        full_name: "Full Name",
        email: "Email",
        phone: "Phone Number",
        nif: "ID / Passport",
        password: "Password",
        confirm_password: "Confirm Password",
        register_button: "Register",
        already_have_account: "Already have an account?",
        login_here: "Login here",
        passwords_do_not_match: "Passwords do not match.",
        registration_success: "Registration successful! You will be redirected to the login page."
    },
     auth_modal: {
        login_title: "Access Required",
        login_message: "To book a service or purchase products, please log in or register an account.",
        verify_title: "Verify Your Email",
        verify_message: "To proceed, please confirm your account using the link sent to your email address.",
        resend_email: "Resend confirmation email",
        email_sent: "Confirmation email resent!",
        close: "Close"
    }
  },
};


// --- Helper Components ---

const LanguageSwitcher = ({ lang, setLang }) => {
  const languages = [
    { code: 'pt', label: 'PT' },
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded-md border-gray-200 text-gray-700 hover:bg-gray-100">
        {lang.toUpperCase()}
        <ChevronDown size={16} className="ml-1" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 w-20 bg-white rounded-md shadow-lg z-50">
          {languages.map((language) => (
            <a
              key={language.code}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setLang(language.code);
                setIsOpen(false);
              }}
              className={`block px-4 py-2 text-sm ${lang === language.code ? 'font-bold text-purple-600' : 'text-gray-700'} hover:bg-gray-100`}
            >
              {language.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/351932209539"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-50"
    aria-label="Contact us on WhatsApp"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.182-.15-.38-.25z"/>
    </svg>
  </a>
);

const FeatureIcon = ({ iconName }) => {
    const baseClass = "w-8 h-8 text-white";
    const icons = {
        Star: <Star className={baseClass} />,
        Calendar: <Calendar className={baseClass} />,
        Gift: <Gift className={baseClass} />,
    };
    return icons[iconName] || <Star className={baseClass} />;
};

const AuthModal = ({ t, modalType, closeModal, setPage, resendEmail }) => {
    if (!modalType) return null;

    const isLoginModal = modalType === 'login';
    const title = isLoginModal ? t.login_title : t.verify_title;
    const message = isLoginModal ? t.login_message : t.verify_message;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center animate-fade-in-down">
                <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${isLoginModal ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    {isLoginModal ? <LogIn className="w-8 h-8 text-yellow-500" /> : <MailWarning className="w-8 h-8 text-blue-500" />}
                </div>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                
                {isLoginModal ? (
                    <div className="space-y-3">
                         <button onClick={() => { closeModal(); setPage('login'); }} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-md hover:shadow-lg transition-shadow">
                            {translations.pt.nav.login}
                        </button>
                         <button onClick={() => { closeModal(); setPage('register'); }} className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-300 transition-colors">
                            {translations.pt.login_page.register_here}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <button onClick={resendEmail} className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition-colors">
                           {t.resend_email}
                        </button>
                    </div>
                )}

                <button onClick={closeModal} className="mt-6 text-sm text-gray-500 hover:text-gray-700">{t.close}</button>
            </div>
        </div>
    );
};

// --- Page Components ---

const HomePage = ({ t, setPage }) => (
  <div className="animate-fade-in bg-white">
    <section className="relative text-gray-800 py-20 md:py-32">
       <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 opacity-60"></div>
       <div className="container mx-auto px-4 text-center relative">
         <div className="inline-block p-4 mb-6 bg-white rounded-full shadow-lg">
            <Crown className="w-12 h-12 text-purple-600" />
         </div>
         <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-purple-900" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.hero.title}</h1>
         <p className="max-w-2xl text-lg md:text-xl text-gray-600 mx-auto mb-8">{t.hero.subtitle}</p>
         <div className="flex justify-center items-center gap-4">
            <button onClick={() => setPage('services')} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                {t.hero.button_start} &rarr;
            </button>
            <button onClick={() => setPage('contact')} className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-200">
                {t.hero.button_more}
            </button>
         </div>
       </div>
    </section>

     <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.hero.features_title}</h2>
                <p className="text-gray-500 mt-2">{t.hero.features_subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {t.feature_cards.map((feature, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100 text-center">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                            index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-blue-400' : 'bg-pink-400'
                        }`}>
                            <FeatureIcon iconName={feature.icon} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>

    <section className="py-20 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4"/>
            <h2 className="text-4xl font-bold mb-2">¡Comienza Tu Viaje de Belleza Hoy!</h2>
            <p className="max-w-2xl mx-auto mb-8">Únete a miles de clientes satisfechos y comienza a acumular puntos con cada visita</p>
            <button onClick={() => setPage('register')} className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Registrarse Ahora ✨
            </button>
        </div>
    </section>
  </div>
);

const ServicesPage = ({ t, auth, setModalType }) => {
    const isActionAllowed = auth.role === 'client' && auth.isVerified;

    const handleBookClick = (e) => {
        if(!isActionAllowed) {
            e.preventDefault();
            if(auth.role === 'guest') {
                setModalType('login');
            } else {
                setModalType('verify');
            }
        }
    };
    
    return (
        <section className="py-16 md:py-24 bg-white animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.services.title}</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 rounded-xl shadow-lg text-center mb-16">
            <Star className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t.points_system.title}</h3>
            <p className="max-w-xl mx-auto mb-4">{t.points_system.description}</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                <span>&#x2B50; {t.points_system.basic}</span>
                <span>&#x2B50;&#x2B50; {t.points_system.premium}</span>
                <span>&#x2B50;&#x2B50;&#x2B50; {t.points_system.luxury}</span>
            </div>
          </div>
          
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <Scissors className="w-8 h-8 text-pink-500" />
              <div>
                <h3 className="text-3xl font-bold text-gray-800">{t.services.hair}</h3>
                <p className="text-gray-500">{t.services.hair_subtitle}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.services.hair_services.map(service => (
                    <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center border border-gray-100 flex flex-col">
                        <div className="w-24 h-24 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                           <ImageIcon className="w-12 h-12 text-pink-400"/>
                        </div>
                        <h4 className="font-bold text-lg text-gray-800 flex-grow">{service.name}</h4>
                        <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                        <div className="flex justify-between items-center text-sm mb-4">
                            <span className="font-bold text-lg">€{service.price}</span>
                            <span className="flex items-center gap-1 font-semibold text-yellow-500">{service.points} <Star size={16}/></span>
                        </div>
                        <button onClick={handleBookClick} disabled={!isActionAllowed} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                            {t.services.book_service}
                        </button>
                    </div>
                ))}
            </div>
          </div>
          <div>
             <div className="flex items-center gap-4 mb-8">
              <Heart className="w-8 h-8 text-pink-500" />
              <div>
                <h3 className="text-3xl font-bold text-gray-800">{t.services.aesthetics}</h3>
                <p className="text-gray-500">{t.services.aesthetics_subtitle}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {t.services.aesthetics_services.map((service, index) => {
                    const colors = [
                        'from-pink-500 to-purple-500',
                        'from-orange-500 to-red-500',
                        'from-green-400 to-blue-500',
                        'from-purple-500 to-indigo-500',
                        'from-cyan-400 to-sky-500',
                        'from-violet-500 to-fuchsia-500'
                    ];
                    return (
                     <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center border border-gray-100 flex flex-col">
                        <div className="w-24 h-24 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                           <ImageIcon className="w-12 h-12 text-pink-400"/>
                        </div>
                        <h4 className="font-bold text-lg text-gray-800 flex-grow">{service.name}</h4>
                        <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                        <div className="flex justify-between items-center text-sm mb-4">
                            <span className="font-bold text-lg">€{service.price}</span>
                            <span className="flex items-center gap-1 font-semibold text-yellow-500">{service.points} <Star size={16}/></span>
                        </div>
                        <button onClick={handleBookClick} disabled={!isActionAllowed} className={`w-full bg-gradient-to-r ${colors[index % colors.length]} text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}>
                            {t.services.book_service}
                        </button>
                    </div>
                    )
                 })}
            </div>
          </div>
        </div>
      </section>
    );
}

const BookingPage = ({ t }) => {
    const [step, setStep] = useState(1);
    const [booking, setBooking] = useState({
        service: '',
        professional: '',
        date: new Date(),
        time: '',
    });
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => setIsConfirmed(true);

    const CalendarComponent = () => {
        const [currentDate, setCurrentDate] = useState(booking.date);
        const today = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const startDay = firstDayOfMonth.getDay();

        const availableTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

        const renderDays = () => {
            const days = [];
            for (let i = 0; i < startDay; i++) {
                days.push(<div key={`empty-${i}`} className="p-2 text-center"></div>);
            }
            for (let i = 1; i <= daysInMonth; i++) {
                const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
                const isPast = dayDate < today.setHours(0,0,0,0);
                const isSelected = booking.date && booking.date.toDateString() === dayDate.toDateString();
                days.push(
                    <div
                        key={i}
                        className={`p-2 text-center cursor-pointer rounded-full transition-colors ${
                            isPast ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-purple-100'
                        } ${isSelected ? 'bg-purple-600 text-white' : ''}`}
                        onClick={() => !isPast && setBooking({...booking, date: dayDate, time: ''})}
                    >
                        {i}
                    </div>
                );
            }
            return days;
        };

        return (
            <div className="bg-white p-6 rounded-lg shadow-inner">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>&lt;</button>
                    <h4 className="font-bold">{currentDate.toLocaleString(t.lang, { month: 'long', year: 'numeric' })}</h4>
                    <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                        <div key={i} className="font-semibold text-center text-gray-500">{day}</div>
                    ))}
                    {renderDays()}
                </div>
                {booking.date && (
                    <div className="mt-6">
                        <h4 className="font-semibold text-center mb-4">{t.booking.availability_for} {booking.service || "Serviço"} {t.booking.on} {booking.date.toLocaleDateString(t.lang)}</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableTimes.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setBooking({...booking, time})}
                                    className={`p-2 border rounded-md transition-colors ${booking.time === time ? 'bg-purple-600 text-white border-purple-600' : 'hover:bg-gray-100'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    if (isConfirmed) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <div className="inline-block bg-purple-100 p-6 rounded-full mb-4">
                    <CheckCircle className="w-16 h-16 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold mb-2">{t.booking.success_title}</h2>
                <p className="text-gray-600 max-w-md mx-auto">{t.booking.success_message}</p>
            </div>
        );
    }
    
    return (
        <section className="py-16 md:py-24 bg-gray-50 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.booking.title}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
                </div>

                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-8">
                      {[t.booking.step1, t.booking.step2, t.booking.step3].map((stepLabel, index) => (
                        <React.Fragment key={index}>
                          <div className={`flex flex-col items-center ${step > index ? 'text-purple-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step > index ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-300 bg-white'}`}>
                              {index + 1}
                            </div>
                            <p className="text-xs mt-2 text-center">{stepLabel}</p>
                          </div>
                          {index < 2 && <div className={`flex-1 h-1 mx-2 ${step > index + 1 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="min-h-[300px]">
                        {step === 1 && (
                            <div className="animate-fade-in-right">
                                <h3 className="text-xl font-semibold mb-4">{t.booking.step1}</h3>
                                <select 
                                    value={booking.service} 
                                    onChange={e => setBooking({...booking, service: e.target.value})}
                                    className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">{t.booking.select_service}</option>
                                    {[...t.services.hair_services, ...t.services.aesthetics_services].map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                </select>
                            </div>
                        )}

                        {step === 2 && (
                             <div className="animate-fade-in-right">
                                <h3 className="text-xl font-semibold mb-4">{t.booking.step2}</h3>
                                <select 
                                    value={booking.professional} 
                                    onChange={e => setBooking({...booking, professional: e.target.value})}
                                    className="w-full p-3 border rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">{t.booking.select_professional}</option>
                                    <option value="any">{t.booking.any_professional}</option>
                                    {t.booking.professionals.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fade-in-right">
                                <h3 className="text-xl font-semibold mb-4">{t.booking.step3}</h3>
                                <CalendarComponent />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between mt-8">
                        <button onClick={() => setStep(s => s - 1)} disabled={step === 1} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-full hover:bg-gray-300 transition disabled:opacity-50">{t.booking.back}</button>
                        {step < 3 ? (
                            <button onClick={() => setStep(s => s + 1)} disabled={!booking.service || (step===2 && !booking.professional)} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 px-6 rounded-full hover:shadow-lg transition disabled:opacity-50">{t.booking.next}</button>
                        ) : (
                            <button onClick={handleConfirm} disabled={!booking.time} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 px-6 rounded-full hover:shadow-lg transition disabled:opacity-50">{t.booking.confirm}</button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};


const ClientDashboard = ({ t, handleLogout }) => {
    const [activeTab, setActiveTab] = useState('loyalty');
    const [showQr, setShowQr] = useState(false);
    
    const clientData = {
        name: 'Ana Silva',
        email: 'ana.silva@email.com',
        phone: '+351 912 345 678',
        nif: '234567890',
        loyaltyPoints: 52,
        loyaltyGoal: 50,
        upcomingBooking: {
            service: 'Balayage',
            professional: 'Edite',
            date: new Date(new Date().setDate(new Date().getDate() + 5)),
            time: '14:00',
        }
    };

    const progress = Math.min((clientData.loyaltyPoints / clientData.loyaltyGoal) * 100, 100);
    const rewardReady = clientData.loyaltyPoints >= clientData.loyaltyGoal;

    const QrCodeComponent = () => {
        if (!showQr) return null;
        
        const qrValue = `DISCOUNT-5EUR-USER-${clientData.nif}-TS-${Date.now()}`;
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrValue)}`;

        return (
            <div className="bg-white p-4 rounded-md inline-block shadow-md animate-fade-in">
                <h5 className="font-bold mb-2">{t.loyalty_status.qr_code_title}</h5>
                <img src={qrApiUrl} alt={t.loyalty_status.qr_code_title} width="160" height="160" />
            </div>
        );
    }
    
    const TabContent = () => {
        switch(activeTab) {
            case 'profile':
                return (
                    <div className="space-y-4">
                         <h3 className="text-xl font-semibold mb-4">{t.profile_details.title}</h3>
                         <div><strong>{t.profile_details.name}:</strong> {clientData.name}</div>
                         <div><strong>{t.profile_details.email}:</strong> {clientData.email}</div>
                         <div><strong>{t.profile_details.phone}:</strong> {clientData.phone}</div>
                         <div><strong>{t.profile_details.nif}:</strong> {clientData.nif}</div>
                    </div>
                );
            case 'bookings':
                return (
                     <div>
                         <h3 className="text-xl font-semibold mb-4">{t.upcoming_booking}</h3>
                         {clientData.upcomingBooking ? (
                             <div className="bg-gray-100 p-4 rounded-md">
                                 <p><strong>{t.service}:</strong> {clientData.upcomingBooking.service}</p>
                                 <p><strong>{t.professional}:</strong> {clientData.upcomingBooking.professional}</p>
                                 <p><strong>{t.date}:</strong> {clientData.upcomingBooking.date.toLocaleDateString(t.lang)} às {clientData.upcomingBooking.time}</p>
                             </div>
                         ) : <p>{t.no_upcoming_booking}</p>}
                     </div>
                );
            case 'loyalty':
                return (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">{t.loyalty_status.title}</h3>
                        <div className="bg-gray-100 p-6 rounded-lg">
                           <div className="flex justify-between items-center mb-2">
                               <span className="font-bold text-gray-700">{t.loyalty_status.points}</span>
                               <span className="font-bold text-purple-600 text-2xl">{clientData.loyaltyPoints}</span>
                           </div>
                           <p className="text-sm text-gray-500 mb-4">{t.loyalty_status.progress}: {clientData.loyaltyPoints % clientData.loyaltyGoal}/{clientData.loyaltyGoal} {t.loyalty_status.goal}</p>
                           <div className="w-full bg-gray-200 rounded-full h-4">
                               <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full" style={{width: `${progress}%`}}></div>
                           </div>
                        </div>

                        {rewardReady && (
                            <div className="mt-6 p-6 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
                                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3"/>
                                <h4 className="font-bold text-lg text-yellow-800">{t.loyalty_status.reward_ready}</h4>
                                <p className="text-yellow-700 mb-4">{t.loyalty_status.reward_description}</p>
                                {!showQr ? (
                                    <button onClick={() => setShowQr(true)} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition flex items-center justify-center mx-auto">
                                        <QrCodeIcon className="mr-2"/> {t.loyalty_status.generate_qr}
                                    </button>
                                ) : (
                                    <QrCodeComponent />
                                )}
                            </div>
                        )}
                    </div>
                );
            default: return null;
        }
    }
    
    return (
        <section className="py-16 md:py-24 bg-gray-50 animate-fade-in">
            <div className="container mx-auto px-4">
                 <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.title}</h2>
                    <p className="text-gray-600">{t.subtitle}</p>
                </div>
                
                <div className="max-w-4xl mx-auto md:flex md:space-x-8">
                    <div className="md:w-1/4 mb-8 md:mb-0">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <ul>
                                {[
                                    {id: 'loyalty', label: t.loyalty, icon: Award},
                                    {id: 'bookings', label: t.my_bookings, icon: Calendar},
                                    {id: 'profile', label: t.my_profile, icon: UserCircle},
                                ].map(item => (
                                    <li key={item.id}>
                                        <button onClick={() => setActiveTab(item.id)} className={`w-full text-left flex items-center p-3 rounded-md transition-colors ${activeTab === item.id ? 'bg-purple-50 text-purple-600 font-bold' : 'hover:bg-gray-100 text-gray-600'}`}>
                                            <item.icon className="mr-3" size={20} /> {item.label}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button onClick={handleLogout} className="w-full text-left flex items-center p-3 rounded-md transition-colors hover:bg-gray-100 text-gray-600">
                                      <LogIn className="mr-3" size={20} /> {t.logout}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="md:w-3/4">
                        <div className="bg-white p-8 rounded-lg shadow-md min-h-[400px]">
                            <TabContent />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BlogPage = ({ t }) => (
    <section className="py-16 md:py-24 bg-gray-50 animate-fade-in">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.blog.title}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.blog.posts.map((post, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${post.image}')` }}></div>
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2 text-gray-800">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <a href="#" className="font-semibold text-purple-600 hover:text-purple-700">{t.blog.read_more} &rarr;</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const ContactPage = ({ t }) => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            if (Math.random() > 0.1) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    return (
        <section className="py-16 md:py-24 bg-white animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.contact.title}</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t.contact.subtitle}</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">{t.contact.name}</label>
                                <input type="text" id="name" name="name" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">{t.contact.email}</label>
                                <input type="email" id="email" name="email" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">{t.contact.message}</label>
                                <textarea id="message" name="message" rows="5" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-4 rounded-md hover:shadow-lg transition-shadow">
                                {status === 'loading' ? 'Enviando...' : t.contact.send}
                            </button>
                            {status === 'success' && <p className="text-green-600 mt-4">{t.contact.success}</p>}
                            {status === 'error' && <p className="text-red-600 mt-4">{t.contact.error}</p>}
                        </form>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">{t.contact.direct_contact}</h3>
                         <div className="flex items-start">
                            <MapPin className="w-6 h-6 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold">Endereço</h4>
                                <p className="text-gray-600">{t.contact.address}</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <Phone className="w-6 h-6 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold">Telefone</h4>
                                <p className="text-gray-600">+351 123 456 789</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <Mail className="w-6 h-6 text-purple-500 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold">Email</h4>
                                <p className="text-gray-600">contacto@centroestetica.pt</p>
                            </div>
                        </div>
                        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Google Map Placeholder</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AdminPage = ({ t, isShopEnabled, setIsShopEnabled, products, handleLogout }) => {
    const [adminTab, setAdminTab] = useState('dashboard');
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [notification, setNotification] = useState('');

    const handleToggleShop = () => {
        const newState = !isShopEnabled;
        setIsShopEnabled(newState);
        setNotification(newState ? t.shop_enabled : t.shop_disabled);
        setTimeout(() => setNotification(''), 3000);
    };
    
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock < 5);

    const renderAdminContent = () => {
        switch(adminTab) {
            case 'dashboard':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold">Vendas Hoje</h4><p className="text-2xl font-bold text-purple-600">€ 350,50</p></div>
                        <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold">Novos Clientes</h4><p className="text-2xl font-bold text-purple-600">12</p></div>
                        <div className="bg-white p-4 rounded-lg shadow"><h4 className="font-bold">Reservas Pendentes</h4><p className="text-2xl font-bold text-purple-600">4</p></div>
                        <div className="md:col-span-2 lg:col-span-3 bg-red-50 border border-red-200 p-4 rounded-lg shadow">
                             <h4 className="font-bold text-red-700 mb-2">{t.low_stock_alert} ({lowStockProducts.length})</h4>
                             {lowStockProducts.length > 0 ? (
                                <ul className="text-sm space-y-1">
                                    {lowStockProducts.map(p => <li key={p.id}>{p.name} - <span className="font-bold">{p.stock} unidades</span></li>)}
                                </ul>
                             ) : <p className="text-sm text-gray-500">Nenhum produto com stock baixo.</p>}
                        </div>
                        <div className="md:col-span-2 lg:col-span-3 bg-white p-4 rounded-lg shadow">
                             <h4 className="font-bold mb-2">{t.sales_overview}</h4>
                              <div className="h-64 bg-gray-100 flex items-center justify-center rounded">
                                <BarChart2 className="w-16 h-16 text-gray-300"/>
                                <p className="text-gray-400 ml-4">Gráfico de vendas apareceria aqui.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'products':
                 return (
                    <div>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                             <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:shadow-lg transition flex items-center justify-center">
                                 <Plus size={18} className="mr-2"/>
                                 {t.add_product}
                             </button>
                              <div className="flex-1 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition cursor-pointer">
                                 <div className="flex items-center justify-center">
                                    <FileSpreadsheet size={18} className="mr-2"/>
                                    <span className="font-bold">{t.import_sheets}</span>
                                 </div>
                                 <p className="text-xs text-center text-green-200">{t.import_sheets_desc}</p>
                             </div>
                        </div>
                        <div className="bg-white overflow-x-auto rounded-lg shadow">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-3 font-semibold">{t.product_table.name}</th>
                                        <th className="p-3 font-semibold">{t.product_table.price}</th>
                                        <th className="p-3 font-semibold">{t.product_table.stock}</th>
                                        <th className="p-3 font-semibold">{t.product_table.actions}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} className="border-b">
                                            <td className="p-3">{p.name}</td>
                                            <td className="p-3">€{p.price.toFixed(2)}</td>
                                            <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${p.stock === 0 ? 'bg-gray-200 text-gray-800' : p.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{p.stock}</span></td>
                                            <td className="p-3 flex gap-2">
                                                <button className="text-gray-500 hover:text-blue-500"><Edit size={18}/></button>
                                                <button className="text-gray-500 hover:text-red-500"><Trash2 size={18}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                 );
            case 'settings':
                return (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="text-xl font-bold mb-4">{t.settings}</h4>
                         <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
                            <label htmlFor="shop-toggle" className="font-medium text-gray-700">{t.shop_visibility_label}</label>
                             <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="shop-toggle" checked={isShopEnabled} onChange={handleToggleShop} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                <label htmlFor="shop-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>
                        {notification && <div className="mt-4 text-center p-2 rounded-md bg-green-100 text-green-700">{notification}</div>}
                         <div className="mt-6 flex items-center justify-between bg-gray-100 p-4 rounded-md">
                            <label htmlFor="superadmin-toggle" className="font-medium text-gray-700">{t.super_admin_toggle}</label>
                             <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="superadmin-toggle" checked={isSuperAdmin} onChange={() => setIsSuperAdmin(!isSuperAdmin)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                <label htmlFor="superadmin-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>
                    </div>
                );
            case 'users':
                 if (!isSuperAdmin) {
                     return <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">{t.user_management_placeholder}</div>
                 }
                 return <div className="bg-white p-6 rounded-lg shadow"><h4 className="text-xl font-bold">Gestão de Utilizadores</h4><p className="mt-2">Aqui, o Super Admin poderia criar, editar e apagar contas de Administradores.</p></div>
            default:
                return null;
        }
    }
    
    return (
        <section className="min-h-screen bg-gray-100">
            <div className="flex">
                <div className="w-64 bg-gray-800 text-white p-5 flex-col min-h-screen hidden md:flex">
                    <div className="text-center mb-10">
                         <img src="Y_W-removebg-preview.png" alt="logo de la empresa" className="h-20 mx-auto" />
                         <h2 className="text-xl font-bold mt-2">Admin</h2>
                    </div>
                    <nav className="flex-grow">
                        <ul>
                           <li className="mb-2"><button onClick={() => setAdminTab('dashboard')} className={`w-full text-left p-3 rounded-md flex items-center transition-colors ${adminTab === 'dashboard' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}><BarChart2 className="mr-3"/>{t.dashboard}</button></li>
                           <li className="mb-2"><button onClick={() => setAdminTab('products')} className={`w-full text-left p-3 rounded-md flex items-center transition-colors ${adminTab === 'products' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}><Package className="mr-3"/>{t.products}</button></li>
                           <li className="mb-2"><button onClick={() => setAdminTab('settings')} className={`w-full text-left p-3 rounded-md flex items-center transition-colors ${adminTab === 'settings' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}><Settings className="mr-3"/>{t.settings}</button></li>
                           {isSuperAdmin && <li className="mb-2"><button onClick={() => setAdminTab('users')} className={`w-full text-left p-3 rounded-md flex items-center transition-colors ${adminTab === 'users' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}><Users className="mr-3"/>{t.users}</button></li>}
                        </ul>
                    </nav>
                     <div>
                         <button onClick={handleLogout} className="w-full text-left p-3 rounded-md flex items-center hover:bg-gray-700 transition-colors"><LogIn className="mr-3" />Sair</button>
                     </div>
                </div>
                 <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
                    {renderAdminContent()}
                </main>
            </div>
        </section>
    );
};


const LoginPage = ({ t, handleLogin, setPage }) => {
    const [isClientPassVisible, setIsClientPassVisible] = useState(false);
    const [isAdminPassVisible, setIsAdminPassVisible] = useState(false);
    const [error, setError] = useState('');

    const handleFormSubmit = (e, role) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if(email && password) {
            handleLogin(role);
        } else {
            setError(t.invalid_credentials)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-0 md:gap-8 bg-white shadow-2xl rounded-xl overflow-hidden">
                    {/* Client Login */}
                    <div className="p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.client_title}</h2>
                        <p className="text-gray-600 mb-6">{t.client_subtitle}</p>
                        <form onSubmit={(e) => handleFormSubmit(e, 'client')}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">Email</label>
                                <input type="email" name="email" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder={t.email_placeholder} />
                            </div>
                            <div className="mb-4 relative">
                                <label className="block text-gray-700 font-bold mb-2">{t.password}</label>
                                <input type={isClientPassVisible ? "text" : "password"} name="password" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                <button type="button" onClick={() => setIsClientPassVisible(!isClientPassVisible)} className="absolute inset-y-0 right-0 top-7 px-3 flex items-center text-gray-500">
                                    {isClientPassVisible ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            <div className="text-right mb-6">
                                <a href="#" className="text-sm text-purple-600 hover:underline">{t.forgot_password}</a>
                            </div>
                            {error === 'client' && <p className="text-red-500 text-center mb-4">{t.invalid_credentials}</p>}
                            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-md hover:shadow-lg transition-shadow">
                                {t.login_button}
                            </button>
                            <p className="text-center mt-6 text-sm">
                                {t.no_account} <a href="#" onClick={(e) => { e.preventDefault(); setPage('register'); }} className="font-bold text-purple-600 hover:underline">{t.register_here}</a>
                            </p>
                        </form>
                    </div>

                    {/* Admin Login */}
                    <div className="p-8 md:p-12 bg-gray-800 text-white">
                        <h2 className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.admin_title}</h2>
                        <p className="text-gray-400 mb-6">{t.admin_subtitle}</p>
                        <form onSubmit={(e) => handleFormSubmit(e, 'admin')}>
                            <div className="mb-4">
                                <label className="block text-gray-300 font-bold mb-2">Email</label>
                                <input type="email" name="email" defaultValue="wmaidana550portugal@gmail.com" required className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div className="mb-6 relative">
                                <label className="block text-gray-300 font-bold mb-2">{t.password}</label>
                                <input type={isAdminPassVisible ? "text" : "password"} name="password" defaultValue="123456" required className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                <button type="button" onClick={() => setIsAdminPassVisible(!isAdminPassVisible)} className="absolute inset-y-0 right-0 top-7 px-3 flex items-center text-gray-400">
                                    {isAdminPassVisible ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            {error === 'admin' && <p className="text-red-500 text-center mb-4">{t.invalid_credentials}</p>}
                             <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 rounded-md hover:bg-purple-700 transition-colors">
                                {t.admin_login_button}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegistrationPage = ({ t, setPage }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError(t.passwords_do_not_match);
            return;
        }

        // Simulate successful registration
        setSuccess(t.registration_success);
        setTimeout(() => {
            setPage('login');
        }, 2000);
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg mx-auto bg-white shadow-2xl rounded-xl p-8 md:p-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.title}</h2>
                    <p className="text-gray-600 mb-6">{t.subtitle}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">{t.full_name}</label>
                        <input type="text" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">{t.email}</label>
                        <input type="email" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">{t.phone}</label>
                        <input type="tel" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">{t.nif}</label>
                        <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">{t.password}</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                     <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">{t.confirm_password}</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                    
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-md hover:shadow-lg transition-shadow">
                        {t.register_button}
                    </button>
                    
                    <p className="text-center mt-6 text-sm">
                        {t.already_have_account} <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }} className="font-bold text-purple-600 hover:underline">{t.login_here}</a>
                    </p>
                </form>
            </div>
        </div>
    );
};


const ShopPage = ({ t, products, handleAddToCart, auth, setModalType }) => {
    const isActionAllowed = auth.role === 'client' && auth.isVerified;

    const onAddToCartClick = (e, productId) => {
         if(!isActionAllowed) {
            e.preventDefault();
            if(auth.role === 'guest') {
                setModalType('login');
            } else {
                setModalType('verify');
            }
        } else {
            handleAddToCart(productId);
        }
    };
    
    return (
    <section className="py-16 md:py-24 bg-gray-50 animate-fade-in">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.shop.title}</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t.shop.subtitle}</p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }}></div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="font-bold text-lg mb-2 text-gray-800 flex-grow">{product.name}</h3>
                            <p className="text-purple-600 font-bold text-xl mb-4">€{product.price.toFixed(2)}</p>
                             <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} ${t.shop.in_stock}` : t.shop.out_of_stock}
                            </p>
                             <div className="mt-auto space-y-2">
                                <button
                                     onClick={() => { /* In a real app, this would also be protected */ }}
                                     className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    {t.shop.view_product}
                                </button>
                                <button
                                    onClick={(e) => onAddToCartClick(e, product.id)}
                                    disabled={product.stock === 0}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:shadow-lg transition-shadow disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    <ShoppingCart size={18} className="mr-2" />
                                    {product.stock > 0 ? t.shop.add_to_cart : t.shop.out_of_stock}
                                </button>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
    );
}

const ProductDetailPage = ({ t, product, setPage, handleAddToCart }) => {
    if (!product) return null;

    return (
        <section className="py-16 md:py-24 bg-white animate-fade-in">
            <div className="container mx-auto px-4">
                <button onClick={() => setPage('shop')} className="text-purple-600 font-semibold mb-8">&larr; {t.shop.continue_shopping}</button>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg"/>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>{product.name}</h2>
                        <p className="text-purple-600 font-bold text-3xl mb-4">€{product.price.toFixed(2)}</p>
                        <p className="text-gray-600 mb-6">{product.description}</p>
                        <p className={`text-lg mb-6 font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock} ${t.shop.in_stock}` : t.shop.out_of_stock}
                        </p>
                        <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={product.stock === 0}
                            className="w-full max-w-sm bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-md hover:shadow-lg transition-shadow disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                        >
                            <ShoppingCart size={22} className="mr-2" />
                            {product.stock > 0 ? t.shop.add_to_cart : t.shop.out_of_stock}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};


const CartPage = ({ t, cart, products, updateQuantity, removeFromCart, setPage }) => {
    const cartDetails = useMemo(() => cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return { ...product, quantity: item.quantity };
    }), [cart, products]);

    const total = useMemo(() => cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartDetails]);

    if (cart.length === 0) {
        return (
            <section className="py-16 md:py-24 bg-gray-50 animate-fade-in">
                <div className="container mx-auto px-4 text-center">
                    <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
                    <h2 className="text-3xl font-bold mb-2">{t.shop.empty_cart}</h2>
                    <button onClick={() => setPage('shop')} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-lg transition-all duration-300">
                        {t.shop.continue_shopping}
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 md:py-24 bg-gray-50 animate-fade-in">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.shop.cart_title}</h2>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {cartDetails.map(item => (
                            <div key={item.id} className="flex items-center justify-between py-4 border-b">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-gray-500">€{item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center border rounded-md">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1"><Minus size={16} /></button>
                                        <span className="px-4">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1"><Plus size={16} /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-500 hover:text-red-500"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                         <div className="text-right mt-6">
                             <p className="text-2xl font-bold">{t.shop.total}: €{total.toFixed(2)}</p>
                             <button onClick={() => setPage('checkout')} className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-md text-lg hover:shadow-lg transition-all duration-300">
                                {t.shop.checkout}
                            </button>
                         </div>
                    </div>
                     <button onClick={() => setPage('shop')} className="text-purple-600 font-semibold mt-8">&larr; {t.shop.continue_shopping}</button>
                </div>
            </div>
        </section>
    );
};

const CheckoutPage = ({t, setPage, cart, products, setCart, setProducts}) => {
    const [deliveryMethod, setDeliveryMethod] = useState('pickup');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);

    const total = useMemo(() => cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0), [cart, products]);

    const finalTotal = deliveryMethod === 'delivery' ? total + 8 : total;

    const calculatePoints = (total) => {
        if (total > 45) return 2;
        if (total >= 16 && total <= 35) return 1;
        if (total > 0 && total < 16) return 0.5;
        return 0;
    };
    
    const handleConfirm = () => {
        const earned = calculatePoints(total);
        setPointsEarned(earned);
        
        let updatedProducts = [...products];
        cart.forEach(cartItem => {
            const productIndex = updatedProducts.findIndex(p => p.id === cartItem.id);
            if(productIndex !== -1) {
                updatedProducts[productIndex].stock -= cartItem.quantity;
            }
        });
        setProducts(updatedProducts);

        setCart([]);
        setIsConfirmed(true);
    };

    if (isConfirmed) {
        return (
             <div className="py-16 md:py-24 text-center animate-fade-in">
                <div className="inline-block bg-purple-100 p-6 rounded-full mb-4">
                    <CheckCircle className="w-16 h-16 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold mb-2">{t.shop.reservation_confirmed}</h2>
                <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
                    {deliveryMethod === 'pickup' ? (
                        <p>{t.shop.pickup_message}</p>
                    ) : (
                        <p>{t.shop.delivery_message_prefix} <strong>€{finalTotal.toFixed(2)}</strong> {t.shop.delivery_message_suffix}</p>
                    )}
                </div>
                {pointsEarned > 0 && (
                    <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded-md inline-block">
                        <p className="font-semibold">{t.shop.points_earned} {pointsEarned} {t.shop.points} 🎉</p>
                    </div>
                )}
                 <div className="mt-8">
                     <button onClick={() => setPage('shop')} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:shadow-lg transition-all duration-300">
                        {t.shop.continue_shopping}
                    </button>
                 </div>
            </div>
        )
    }

    return (
        <section className="py-16 md:py-24 bg-gray-50 animate-fade-in">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.shop.checkout_title}</h2>
                <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">{t.shop.delivery_method}</h3>
                    <div className="space-y-4 mb-8">
                       <div onClick={() => setDeliveryMethod('pickup')} className={`p-4 border-2 rounded-lg cursor-pointer flex items-center ${deliveryMethod === 'pickup' ? 'border-purple-500 bg-purple-50' : ''}`}>
                            <Store className="mr-4 text-purple-500"/>
                            <div>
                                <p className="font-bold">{t.shop.pickup}</p>
                                <p className="text-sm text-gray-500">Gratuito</p>
                            </div>
                       </div>
                       <div onClick={() => setDeliveryMethod('delivery')} className={`p-4 border-2 rounded-lg cursor-pointer flex items-center ${deliveryMethod === 'delivery' ? 'border-purple-500 bg-purple-50' : ''}`}>
                            <Truck className="mr-4 text-purple-500"/>
                            <div>
                                <p className="font-bold">{t.shop.delivery}</p>
                                <p className="text-sm text-gray-500">+ 8.00€ (até 8km)</p>
                            </div>
                       </div>
                    </div>
                     <div className="border-t pt-6 text-right">
                         <p className="text-2xl font-bold">{t.shop.total}: €{finalTotal.toFixed(2)}</p>
                         <button onClick={handleConfirm} className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-md text-lg hover:shadow-lg transition-all duration-300">
                            {t.shop.confirm_reservation}
                        </button>
                     </div>
                </div>
            </div>
        </section>
    );
};

// --- Main App Component ---

export default function App() {
  const [lang, setLang] = useState('pt');
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useState({ role: 'guest', isVerified: false });
  const [modalType, setModalType] = useState(null); // 'login', 'verify', or null
  
  const [isShopEnabled, setIsShopEnabled] = useState(true);
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState('');

  const t = translations[lang];

  const handleLogin = (role) => {
    setAuth({ role, isVerified: role === 'admin' });
    
    if(role === 'client') {
        setPage('clientDashboard');
        setModalType('verify');
    } else if (role === 'admin') {
        setPage('adminDashboard');
    }
  };
  
  const handleResendEmail = () => {
      setNotification(t.auth_modal.email_sent);
      setTimeout(() => setNotification(''), 2000);
      setModalType(null);
  };

  const handleLogout = () => {
      setAuth({ role: 'guest', isVerified: false });
      setPage('home');
  }

  const handleAddToCart = (productId) => {
    const isActionAllowed = auth.role === 'client' && auth.isVerified;
    if (!isActionAllowed) {
        setModalType(auth.role === 'guest' ? 'login' : 'verify');
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    
    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.id === productId);
        if (existingItem) {
            const canAddToCart = existingItem.quantity < product.stock;
            if (canAddToCart) {
                 setNotification(t.shop.item_added);
                 setTimeout(() => setNotification(''), 2000);
                 return prevCart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return prevCart;
        } else {
            setNotification(t.shop.item_added);
            setTimeout(() => setNotification(''), 2000);
            return [...prevCart, { id: productId, quantity: 1 }];
        }
    });
  };
  
  const updateCartQuantity = (productId, quantity) => {
      const product = products.find(p => p.id === productId);
      if (quantity === 0) {
          setCart(cart.filter(item => item.id !== productId));
      } else if (product && quantity > 0 && quantity <= product.stock) {
          setCart(cart.map(item => item.id === productId ? {...item, quantity } : item));
      }
  };

  const removeFromCart = (productId) => {
      setCart(cart.filter(item => item.id !== productId));
  };

  const handleSetPage = (pageName) => {
    setPage(pageName);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage t={t} setPage={handleSetPage} />;
      case 'services': return <ServicesPage t={t} auth={auth} setModalType={setModalType} />;
      case 'book': return <BookingPage t={t} />;
      case 'login': return <LoginPage t={t.login_page} handleLogin={handleLogin} setPage={handleSetPage} />;
      case 'register': return <RegistrationPage t={t.register_page} setPage={handleSetPage} />;
      case 'clientDashboard': return <ClientDashboard t={t.client_dashboard} handleLogout={handleLogout} />;
      case 'adminDashboard': return <AdminPage t={t.admin_page} isShopEnabled={isShopEnabled} setIsShopEnabled={setIsShopEnabled} products={products} handleLogout={handleLogout} />;
      case 'shop': return <ShopPage t={t} products={products} handleAddToCart={handleAddToCart} setPage={handleSetPage} setSelectedProduct={setSelectedProduct} auth={auth} setModalType={setModalType} />;
      case 'productDetail': return <ProductDetailPage t={t} product={selectedProduct} setPage={handleSetPage} handleAddToCart={handleAddToCart} />;
      case 'cart': return <CartPage t={t} cart={cart} products={products} updateQuantity={updateCartQuantity} removeFromCart={removeFromCart} setPage={handleSetPage} />;
      case 'checkout': return <CheckoutPage t={t} setPage={handleSetPage} cart={cart} products={products} setCart={setCart} setProducts={setProducts} />;
      case 'blog': return <BlogPage t={t} />;
      case 'contact': return <ContactPage t={t} />;
      default: return <HomePage t={t} setPage={handleSetPage} />;
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    ...(isShopEnabled ? [{ id: 'shop', label: t.nav.shop }] : []),
    { id: 'blog', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact },
  ];
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const showHeaderFooter = auth.role !== 'admin';

  return (
    <div className="bg-white text-gray-700 font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
       <AuthModal t={t.auth_modal} modalType={modalType} closeModal={() => setModalType(null)} setPage={handleSetPage} resendEmail={handleResendEmail} />
      {notification && (
          <div className="fixed top-24 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-[100] animate-fade-in-down">
              {notification}
          </div>
      )}
      {showHeaderFooter && (
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="cursor-pointer flex items-center gap-2" onClick={() => handleSetPage('home')}>
                <img src="Y_W-removebg-preview.png" alt="logo de la empresa" className="h-14" />
                <span className="font-bold text-lg text-purple-800 hidden sm:block">YW Salão de Beleza</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map(item => (
                <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); handleSetPage(item.id); }} 
                   className={`font-medium ${page === item.id ? 'text-purple-600' : 'text-gray-600'} hover:text-purple-600 transition-colors`}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
                <a href="https://www.facebook.com/wm.digital2025" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors">
                    <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/wm_digital2025/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors">
                    <Instagram size={20} />
                </a>
                 {isShopEnabled && auth.role !== 'admin' && (
                    <button onClick={() => handleSetPage('cart')} className="relative flex items-center text-sm font-medium text-gray-600 hover:text-purple-600">
                        <ShoppingCart size={24}/>
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>
                        )}
                    </button>
                 )}
                 {auth.role === 'guest' ? (
                    <button onClick={() => handleSetPage('login')} className="flex items-center text-sm font-medium text-gray-600 hover:text-purple-600">
                        <UserCircle className="mr-1" size={20}/>
                        {t.nav.login}
                    </button>
                 ) : (
                     <button onClick={handleLogout} className="flex items-center text-sm font-medium text-gray-600 hover:text-purple-600">
                        <LogIn className="mr-1" size={20}/>
                        {t.client_dashboard.logout}
                    </button>
                 )}
                <LanguageSwitcher lang={lang} setLang={setLang} />
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 border-t animate-fade-in-down">
            <nav className="flex flex-col space-y-4 mb-4">
              {navItems.map(item => (
                <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); handleSetPage(item.id); }} className="font-medium text-gray-600 hover:text-purple-600">{item.label}</a>
              ))}
               {auth.role === 'guest' ? (
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSetPage('login'); }} className="font-medium text-gray-600 hover:text-purple-600">{t.nav.login}</a>
               ) : (
                   <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="font-medium text-gray-600 hover:text-purple-600">{t.client_dashboard.logout}</a>
               )}
            </nav>
            <div className="flex justify-between items-center">
                <LanguageSwitcher lang={lang} setLang={setLang} />
                <div className="flex items-center gap-4">
                    <a href="https://www.facebook.com/wm.digital2025" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors"><Facebook size={22} /></a>
                    <a href="https://www.instagram.com/wm_digital2025/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors"><Instagram size={22} /></a>
                    {isShopEnabled && (
                        <button onClick={() => handleSetPage('cart')} className="relative flex items-center text-sm font-medium text-gray-600 hover:text-purple-600">
                            <ShoppingCart size={24}/>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>
                            )}
                        </button>
                     )}
                </div>
            </div>
          </div>
        )}
      </header>
        )}
      
      <main>
        {renderPage()}
      </main>
      
       {showHeaderFooter && (
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-left">
                    <h3 className="text-xl font-bold text-white mb-3">{t.footer.about}</h3>
                    <p className="text-sm">{t.footer.description}</p>
                </div>
                <div className="text-left md:text-center">
                    <h3 className="text-xl font-bold text-white mb-3">Links</h3>
                     <ul className="space-y-2">
                        {navItems.map(item => (
                          <li key={item.id}>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleSetPage(item.id); }} className="hover:text-purple-400 transition-colors">{item.label}</a>
                          </li>
                        ))}
                     </ul>
                </div>
                <div className="text-left md:text-right">
                    <h3 className="text-xl font-bold text-white mb-3">{t.footer.follow}</h3>
                    <div className="flex space-x-4 md:justify-end">
                       <a href="https://www.facebook.com/wm.digital2025" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook size={24}/></a>
                       <a href="https://www.instagram.com/wm_digital2025/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24}/></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-sm">
                <p>&copy; {new Date().getFullYear()} Salão de Beleza. Todos os direitos reservados.</p>
                <a href="#" onClick={(e) => { e.preventDefault(); handleSetPage('login'); }} className="text-xs text-gray-500 hover:text-gray-400 mt-2 inline-block">Admin Access</a>
            </div>
        </div>
      </footer>
        )}
      
      <FloatingWhatsApp />
      <style>{`
        .toggle-checkbox:checked {
            right: 0;
            border-color: #9333ea; /* purple-600 */
        }
        .toggle-checkbox:checked + .toggle-label {
            background-color: #9333ea; /* purple-600 */
        }
      `}</style>
    </div>
  );
}
