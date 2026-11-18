document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобильное бургер-меню
  const header = document.getElementById('header');
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMenu = (forceClose = false) => {
    if (!burgerBtn || !mobileMenu) return;
    const isOpen = forceClose ? false : !burgerBtn.classList.contains('is-open');
    burgerBtn.classList.toggle('is-open', isOpen);
    mobileMenu.classList.toggle('is-open', isOpen);
    if (header) {
      header.classList.toggle('is-menu-open', isOpen);
    }
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => toggleMenu());
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(true));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        toggleMenu(true);
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileMenu.classList.contains('is-open')) {
        toggleMenu(true);
      }
    });
  }

  // 2. Мультиязычность (RU / ENG) с сохранением в localStorage
  const TITLE_EN = {
    'Kurlaev Andrew — Senior Communication Designer': 'Kurlaev Andrew — Senior Communication Designer',
    'A-Dengi — Kurlaev Andrew': 'A-Dengi — Kurlaev Andrew',
    'Т-Банк x Zaymer — Kurlaev Andrew': 'T-Bank x Zaymer — Kurlaev Andrew',
    'Zaymer RU — Kurlaev Andrew': 'Zaymer RU — Kurlaev Andrew',
    'Zaymer KZ — Kurlaev Andrew': 'Zaymer KZ — Kurlaev Andrew',
    'UnaMoliya — кейс | Kurlaev Andrew': 'UnaMoliya — Case Study | Kurlaev Andrew',
    'Other Projects — кейс | Kurlaev Andrew': 'Other Projects — Case Study | Kurlaev Andrew'
  };

  const ARIA_EN = {
    'Открыть меню': 'Open menu',
    'Основная навигация': 'Main navigation',
    'Выбор языка': 'Language switcher',
    'Навигация по проектам': 'Project navigation',
    'Другие проекты': 'Other projects',
    'Проекты': 'Projects'
  };

  const TEXT_EN = {
    // Общие элементы и навигация между проектами
    'Т-Банк x Zaymer': 'T-Bank x Zaymer',
    'Как мы разработали МФО от Альфа Банка': 'How we launched an MFI spin-off for Alfa-Bank',
    'Как я создал Key visual для коллаборации Zaymer и Т-Банк': 'How I crafted the Key Visual for the Zaymer × T-Bank collab',
    'Как мы сделали крупный ребрендинг для лидера по выдачам МФО - Zaymer': 'How we pulled off a major rebrand for Zaymer, Russia’s #1 MFI',
    'Как я локализировал с помощью брендинга весь SMM для МФО в Казахстане': 'How I localized the entire SMM presence for an MFI in Kazakhstan',
    'Как мы создали уникальный продукт для целой страны': 'How we built a one-of-a-kind product for an entire country',
    'Другие проекты которые я разрабатывал': 'Other projects I’ve designed along the way',

    // Общие заголовки и подписи
    'Цель': 'The Goal',
    'Задача': 'The Challenge',
    'Задачи': 'The Tasks',
    'Результат': 'The Results',
    'Результаты': 'The Results',
    'Пример SMM поста': 'SMM post sample',
    'Пример SMM-поста': 'SMM post sample',
    'Пример Key Visual': 'Key Visual sample',
    'Пример иллюстраций в приложении': 'In-app illustrations sample',
    'Пример иллюстрации на сайте': 'Website illustration sample',

    // index.html — Hero
    'Разрабатываю и масштабирую визуальные системы, 3D-коммуникации и AI-пайплайны для ИТ-продуктов. Помогаю брендам ускорять Time-to-Market и растить конверсии через сильные визуальные метафоры.':
      'I design and scale visual systems, 3D communications, and AI pipelines for digital products. Helping brands speed up Time-to-Market and boost conversions through bold visual storytelling.',
    'Опыт работы с рынками: Испания, Казахстан, Филиппины, Узбекистан, Россия.':
      'Markets I’ve worked with: Spain, Kazakhstan, the Philippines, Uzbekistan, and Russia.',
    'Коллаборации: Т-Банк, Альфа-Банк.':
      'Brand collabs: T-Bank, Alfa-Bank.',

    // index.html — Experience & Skillset
    'Что я умею?': 'What I bring to the table',
    '3D & Визуал': '3D & Visuals',
    'Маркетинг': 'Marketing',
    'Продукт': 'Product',
    'Создание айдентики': 'Brand identity from scratch',
    'Масштабирование систем': 'Scaling design systems',
    'Разработка брендбуков': 'Brandbooks & guidelines',
    'Разработка логотипов': 'Logo design',
    'Hard skill Senior': 'Senior-level hard skills',
    'Кастомная 3D-графика': 'Custom 3D graphics',
    'Уникальные 3D-паки': 'Bespoke 3D asset packs',
    '3D-анимация': '3D motion & animation',
    'Перформанс-дизайн': 'Performance design',
    'Гайдлайны': 'Visual guidelines',
    'SMM структура': 'SMM visual architecture',
    'Развитие продукта': 'Product growth & visuals',
    'Продуктовые коллаборации': 'Product collabs',
    'Анализ конкурентов': 'Competitor analysis',
    'Монтаж видео': 'Video editing',
    'Видеосъемка': 'Video production',
    'Фотография': 'Photography',
    'UI-дизайн': 'UI design',
    'Презентации': 'Pitch decks & presentations',
    'Колористика': 'Color theory',
    'Типографика': 'Typography',
    'Композиция': 'Composition',

    // a-dengi.html
    'Цель продукта': 'Product Goal',
    'Удержание «отказного» трафика Альфа-Банка. Создание отдельного МФО-сервиса, чтобы сохранять аудиторию, которой банк отказал в классическом кредите, и перенаправлять её на микрокредитование.':
      'Retaining Alfa-Bank’s declined loan traffic. We launched a standalone MFI service to catch users who didn’t qualify for a regular bank loan and smoothly route them into micro-lending.',
    'Построить с нуля визуальную базу для бесшовного перенаправления пользователей.':
      'Build a visual foundation from scratch to make that user handoff feel seamless.',
    'Было необходимо разработать айдентику и масштабный пак уникальной 3D-графики для всех уровней коммуникации, чтобы направить пользователя в новый продукт и сохранить доверие в новом сервисе.':
      'We needed a fresh identity and a massive custom 3D graphics pack across every touchpoint—guiding users into the new product while keeping the same high level of trust.',
    'Неогротеск, выбранный для удобства и простоты в интерфейсах.':
      'A clean neo-grotesque chosen for effortless clarity across interfaces.',
    'Универсальный шрифт сохраняет абсолютную читаемость в микроформатах, удобен для визуальной коммуникации, большая вариативность применения в продуктовой платформе и материалах.':
      'A super versatile typeface that stays razor-sharp even in micro-sizes, works great for brand comms, and scales smoothly across both product UI and promo materials.',
    'Пример mail рассылки': 'Email campaign sample',
    'Onboarding приложения': 'App onboarding',
    'Screens для Google Play': 'Google Play store screens',
    'Иллюстрации разработаны с использованием основного брендбука, учитывая формы, цвета, шрифты для узнаваемости бренда.':
      'Every illustration is built straight from the core brandbook—matching shapes, colors, and typography for instant brand recognition.',
    'A-Dengi успешно выполнил свои бизнес-задачи.':
      'A-Dengi hit all of its business targets.',
    'Разработал сквозную визуальную систему бренда. Внедрение кастомного 3D-пака и шаблонов в Figma ускорило сборку перформанс-баннеров на 40%.':
      'Built an end-to-end visual system for the brand. Rolling out the custom 3D pack and Figma templates sped up performance banner production by 40%.',
    'Макеты подготовлены под pixel-perfect handoff для фронтенд-разработки.':
      'All layouts were delivered ready for a pixel-perfect frontend handoff.',

    // tbank-zaymer.html
    'Цель коллаборации': 'Collab Goal',
    'Кросс-промо кампания двух финтех-экосистем для продвижения совместных инструментов:':
      'A cross-promo campaign uniting two fintech ecosystems to push joint financial tools:',
    'Получение займов на Т-Банк и погашение кредитов без переплат с карты Т-Банк.':
      'Instant loan payouts to T-Bank cards and zero-fee repayments straight from T-Bank.',
    'Продвижение дебетовых карт и Т-Мобайла.':
      'Promoting T-Bank debit cards and T-Mobile SIMs.',
    'Разработка универсального Key Visual для рекламы в Личном Кабинете.':
      'Crafting a flexible Key Visual for in-app promos inside the user dashboard.',
    'Найти баланс между графикой Т-Банка и айдентикой Займера.':
      'Finding that sweet spot between T-Bank’s signature graphics and Zaymer’s visual DNA.',
    'Прямая работа и согласование концепций с руководителями Т-Банка.':
      'Direct pitching and sign-off sessions with T-Bank’s leadership team.',
    'Спроектировал визуальную концепцию (Key Visual) и UI-решения для масштабной ко-брендинговой интеграции. Созданная система 3D-композиций обеспечила бесшовный пользовательский опыт на многомиллионную аудиторию.':
      'Designed the Key Visual concept and UI touchpoints for a massive co-branding integration. The 3D composition system delivered a seamless experience for an audience of millions.',
    'На главном экране сайта интегрирована кнопка Т-Банка, сразу заявляющая о взаимодействии систем.':
      'Added a dedicated T-Bank button right on the main screen, signaling the partnership from the first tap.',
    'Полностью настроен и функционирует прием платежей через шлюзы Т-Банка.':
      'Payment processing via T-Bank gateways is fully live and running smoothly.',

    // zaymer-ru.html
    'О продукте': 'About the Product',
    'Лидер рынка РФ по выдаче микрозаймов, 11 лет на рынке, с полноценной веб-экосистемой и мобильным приложением. Более 5 миллионов клиентов, 25+ миллионов выданных займов, выручка компании за все время превысила 185 миллиардов рублей.':
      'Russia’s #1 micro-lending platform with 11 years on the market, a full web ecosystem, and a native mobile app. Over 5M customers, 25M+ loans issued, and 185B+ RUB in lifetime revenue.',
    '17 миллионов регистраций за историю продукта, из которых 1,3 миллиона — в 2023 году (абсолютный рекорд на рынке микрофинансирования РФ).':
      '17M total sign-ups since launch, including 1.3M in 2023 alone — an all-time record in the Russian microfinance market.',
    'Актуализация и развитие визуального стиля бренда совместно с дизайн-командой.':
      'Refreshing and evolving the brand’s visual style together with the design team.',
    'Разработка нового визуального языка в редизайне и фиксация правил в брендбуке.':
      'Shaping a new visual language for the rebrand and locking all rules into a brandbook.',
    'Создание автономной библиотеки 3D-ассетов взамен стокового контента.':
      'Building a self-sufficient 3D asset library to replace generic stock visuals.',
    'Разработка шаблонов, ускоривших выпуск маркетинговых материалов.':
      'Creating smart templates that sped up marketing production across the board.',
    'Создание Key Visuals и проведение совместных А/Б тестов для проверки гипотез.':
      'Designing Key Visuals and running joint A/B tests to validate creative hypotheses.',
    'Screens для App Store': 'App Store screens',
    'Разработка системы кастомных 3D-ассетов для автономного использования во всех видах коммуникаций.':
      'Building a custom 3D asset system ready to drop into any communication channel.',
    'Создание пака позволило унифицировать визуальный язык бренда, отстроиться от конкурентов и сократить время на производство маркетинговых материалов.':
      'The pack unified the brand’s look, set us apart from competitors, and cut down marketing production time.',
    'В результате редизайна создана узнаваемая визуальная система.':
      'The rebrand delivered a crisp, instantly recognizable visual system.',
    'Коммуникационная дизайн-система, шаблонов и кастомной 3D-библиотеки значительно сократила время производства контента.':
      'A unified comms design system, templates, and custom 3D library drastically cut content turnaround.',
    'Реализовал глобальный рестайлинг коммуникаций бренда.':
      'Pulled off a full global restyling of the brand’s communications.',
    'Создал библиотеку из 30+ кастомных 3D-ассетов (Cinema 4D / Octane) и обновил фотостиль, автоматизировав регулярную генерацию контента для маркетинга.':
      'Crafted a 30+ custom 3D asset library (Cinema 4D / Octane) and refreshed the photo direction, automating day-to-day marketing content creation.',

    // zaymer-kz.html
    'Ребрендинг и локализация сервиса на рынке Казахстана. Было необходимо перестроить коммуникацию с акцентом на казахский язык и адаптировать визуал под культурный контекст региона для лояльности аудитории к бренду.':
      'Rebranding and localizing the service for Kazakhstan. We needed to shift communications toward the Kazakh language and weave regional cultural vibes into the visuals to build real audience trust.',
    'Масштабный research конкурентов в соцсетях для выявления проблем визуального языка.':
      'Deep-dive competitor social media research to spot gaps in the local visual landscape.',
    'Полное обновление SMM-контента, устранение шума и разработка строгих гайдлайнов для верстки.':
      'Total SMM overhaul — cutting out visual clutter and setting clean, strict layout guidelines.',
    'Интеграция национальной айдентики Казахстана в современный цифровой дизайн и создание локального 3D-пака.':
      'Blending traditional Kazakh identity into modern digital design alongside a localized 3D pack.',
    'SMM-стратегии на основе данных ресерча и очищение визуала обеспечили прирост лидов из соцсетей более чем на 20%.':
      'Research-backed SMM strategy and cleaner visuals drove a 20%+ boost in social media leads.',
    'Внедрение национальной айдентики и фокус на казахском языке напрямую увеличили общую конверсию продукта.':
      'Embracing local identity and leading with Kazakh-language copy directly lifted overall product conversion.',
    'Кастомная 3D-визуализация, обновленный брендбук и шаблоны успешно развернуты на всех видах коммуникации':
      'Custom 3D visuals, the refreshed brandbook, and ready-to-go templates were rolled out across all channels.',

    // unamolia.html
    'Проектирование и запуск с нуля нового финтех-бренда на рынке микрокредитования Узбекистана. Главная цель — разработать визуальный язык и лор продукта для органичного входа на новый рынок.':
      'Designing and launching a brand-new fintech brand from scratch in Uzbekistan’s micro-lending market. The goal was to build a visual language and product lore that feel natural and local from day one.',
    'Командная разработка уникального фирменного стиля и визуального языка бренда с нуля.':
      'Team effort crafting a unique brand identity and visual language from the ground up.',
    'Интеграция национальной айдентики Узбекистана в современный цифровой дизайн по методу кейса «Займер КЗ».':
      'Weaving Uzbekistan’s national heritage into modern digital design using the playbook from our Zaymer KZ case.',
    'Создание и проработка фирменного персонажа с помощью ИИ-инструментов для доверия пользователей к бренду.':
      'Creating and refining a signature brand mascot using AI tools to build instant warmth and user trust.',
    'Разработка автономного 3D-пака для использования на всех уровнях коммуникации и продуктовых слоев.':
      'Building an autonomous 3D asset pack that works across every marketing and product layer.',
    'Пример SMM-постов с AI генерацией национальных персонажей':
      'SMM post samples featuring AI-generated local characters',
    'Создание пака унифицировало визуальный язык бренда, сократило время на производство маркетинговых материалов и создало национальную уникальность интерфейсу за счет песочных текстур и элементов бренда.':
      'The pack unified our brand look, cut marketing production time, and gave the UI an unmistakable local feel with warm sand textures and signature brand motifs.',
    'Маскот': 'The Mascot',
    'Снежный барс, национальное животное Узбекистана.':
      'A snow leopard — Uzbekistan’s iconic national animal.',
    'Он дружелюбный, улыбчивый, одет в чапан и тюбетейку. Много знает про финансы и с радостью расскажет о них простым языком.':
      'Friendly, always smiling, dressed in a traditional chapan coat and tubeteika cap. Knows his stuff about finance and loves breaking it down in plain, everyday language.',
    'С нуля развернуты и упакованы каналы бренда на ключевых площадках (Telegram, Instagram).':
      'Launched and packaged the brand’s key social channels (Telegram, Instagram) from zero.',
    'Telegram-канал вырос с 0 до 3600+ активных подписчиков за счет национальной айдентики и ИИ-маскота.':
      'The Telegram channel grew from 0 to 3,600+ active subscribers thanks to local visual cues and our AI mascot.',
    'Визуальная система обеспечила вовлеченность, переходы по ссылкам, скачивания приложения и выдачи займов.':
      'The visual system drove strong engagement, link clicks, app installs, and loan issuances.',

    // other.html
    'Иллюстрации для инвестиционного проекта': '3D Illustrations for',
    'Иллюстрации разработаны для ребрендинга инвестиционной платформы RoboCash.':
      'Custom illustrations crafted for the RoboCash investment platform rebrand.',
    'Стиль иллюстрации разработан исходя из нового брендбука и уникальному подходу к разработке визуального языка':
      'The illustration style grew straight out of the new brandbook and a fresh take on their visual language.',
    'Стиль иллюстрации разработан исходя из нового бренбука и уникальному подходу к разработке визуального языка':
      'The illustration style grew straight out of the new brandbook and a fresh take on their visual language.',
    'Иллюстрации для': '3D Visuals for',
    'МФО «CreditBar»': 'CreditBar MFI',
    'Серия 3D-иллюстраций, созданная с нуля для МФО в Казахстане. Стиль развивался параллельно с продуктом, задавая трендовый визуальный тон интерфейсам и маркетингу бренда.':
      'A 3D illustration series built from scratch for an MFI in Kazakhstan. The style evolved side-by-side with the product, setting a bold, trendy tone for both UI and marketing.',
    'Айдентика для МФО SatCredit': 'Brand Identity for SatCredit MFI',
    'Разработка базовой айдентики и дизайн-элементов бренда в недельный спринт.':
      'Crafted the core brand identity and key design assets in a tight one-week sprint.',
    'Визуальная система построена на стыке традиционных казахских символов и понятной финансовой графики, обеспечивая легкое считывание бренда и доверие пользователей всех возрастных категорий.':
      'The visual system blends traditional Kazakh motifs with clean financial graphics, making the brand instantly readable and trustworthy across all age groups.',
    'Брендинг': 'Branding:',
    'для': '',
    'строительной компании Аксай': 'Aksai Construction',
    'Редизайн логотипа с переходом в комплексный брендбук для компании «Аксай».':
      'Logo redesign that grew into a full-scale brandbook for the Aksai construction company.',
    'Стиль объединяет инженерную строгость, контрастные цвета и монументальную форму знака для физических и цифровых носителей.':
      'The style pairs engineering precision with high-contrast colors and a bold, monolithic mark built for both physical gear and digital touchpoints.',
    'Было': 'Before',
    'Стало': 'After',
    'Технологичный вариативный гротеск с жесткой геометрией, отражающий эстетику будущего, надежность и архитектурную точность.':
      'A tech-forward variable grotesk with sharp geometry that captures futuristic aesthetics, reliability, and architectural precision.',
    'Используется во всех видах логотипа в измененном виде, либо для кричащих заголовков в онлайн и оффлайн коммуникациях.':
      'Used in a customized form across all logo variations, as well as for punchy headlines in online and offline campaigns.',
    'Шрифт': 'Original',
    'без изменений': 'typeface',
    'Шрифт с изменениями': 'Customized',
    'для логотипа': 'for the logo'
  };

  const originalTitle = document.title;
  const textEntries = [];
  const ariaEntries = [];

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
        return NodeFilter.FILTER_REJECT;
      }
      const normalized = node.nodeValue.replace(/\s+/g, ' ').trim();
      if (normalized && Object.prototype.hasOwnProperty.call(TEXT_EN, normalized)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    }
  });

  let currentNode;
  while ((currentNode = walker.nextNode())) {
    const raw = currentNode.nodeValue;
    const normalized = raw.replace(/\s+/g, ' ').trim();
    const leadingMatch = raw.match(/^\s*/);
    const trailingMatch = raw.match(/\s*$/);
    textEntries.push({
      node: currentNode,
      original: raw,
      key: normalized,
      leading: leadingMatch ? leadingMatch[0] : '',
      trailing: trailingMatch ? trailingMatch[0] : ''
    });
  }

  document.querySelectorAll('[aria-label]').forEach((el) => {
    const label = el.getAttribute('aria-label');
    if (label && Object.prototype.hasOwnProperty.call(ARIA_EN, label)) {
      ariaEntries.push({ el, original: label, key: label });
    }
  });

  const langBtns = document.querySelectorAll('.lang-btn');

  const applyLanguage = (lang) => {
    const isEng = lang === 'eng';
    document.documentElement.lang = isEng ? 'en' : 'ru';
    document.title = isEng ? (TITLE_EN[originalTitle] || originalTitle) : originalTitle;

    textEntries.forEach(({ node, original, key, leading, trailing }) => {
      if (!isEng) {
        node.nodeValue = original;
      } else {
        const translated = TEXT_EN[key];
        node.nodeValue = translated === '' ? '' : `${leading}${translated}${trailing}`;
      }
    });

    ariaEntries.forEach(({ el, original, key }) => {
      el.setAttribute('aria-label', isEng ? ARIA_EN[key] : original);
    });

    langBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });

    try {
      localStorage.setItem('siteLang', lang);
    } catch (e) {
      // ignore storage errors in private mode
    }
  };

  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyLanguage(btn.dataset.lang || 'ru');
    });
  });

  let savedLang = 'ru';
  try {
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang === 'eng' || urlLang === 'ru') {
      savedLang = urlLang;
    } else {
      const stored = localStorage.getItem('siteLang');
      if (stored === 'eng' || stored === 'ru') {
        savedLang = stored;
      }
    }
  } catch (e) {
    savedLang = 'ru';
  }
  applyLanguage(savedLang);

  // 3. Активный пункт в шапке и мобильном меню
  const navLinks = document.querySelectorAll('.header-nav .nav-link');
  const homeSections = document.querySelectorAll('#about, #cases, #experience');

  if (homeSections.length > 0) {
    const setActiveNav = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
      mobileLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    };

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('href').replace('#', '');
        setActiveNav(targetId);
      });
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('href').replace('#', '');
        setActiveNav(targetId);
      });
    });

    const updateActiveNavOnScroll = () => {
      const scrollPos = window.scrollY + 180;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;

      if (isAtBottom) {
        setActiveNav('experience');
        return;
      }

      homeSections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveNav(id);
        }
      });
    };

    window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
    updateActiveNavOnScroll();
  } else {
    // На страницах кейсов подсвечиваем Cases в мобильном меню
    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('is-active', href.endsWith('#cases'));
    });
  }

  // 4. Горизонтальный drag-to-scroll для всех каруселей
  const enableDragScroll = (el) => {
    let isDown = false;
    let hasDragged = false;
    let startX = 0;
    let scrollLeft = 0;

    el.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      hasDragged = false;
      el.classList.add('is-dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => {
      isDown = false;
      el.classList.remove('is-dragging');
    });

    el.addEventListener('mouseup', () => {
      isDown = false;
      el.classList.remove('is-dragging');
    });

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      if (Math.abs(x - startX) > 6) {
        hasDragged = true;
      }
      const walk = (x - startX) * 1.4;
      el.scrollLeft = scrollLeft - walk;
    });

    el.addEventListener('click', (e) => {
      if (hasDragged) {
        e.preventDefault();
      }
    });
  };

  document
    .querySelectorAll(
      '#projectNavTrack, .onboard-row, .store-grid, .tb-banners-row, .zr-kv-grid, .zr-bottom-row, .zr-icons-grid, .kz-smm-carousel, .um-badges-track, .um-ai-smm__grid, .um-renders__carousel, .ot-rc-carousel, .ot-cb-circles'
    )
    .forEach(enableDragScroll);

  // Начинаем нижнюю навигацию со «следующего» проекта (если указан data-nav-start)
  const navTrack = document.getElementById('projectNavTrack');
  if (navTrack) {
    const startCard = navTrack.querySelector('[data-nav-start]');
    if (startCard) {
      const gutter = parseFloat(getComputedStyle(navTrack).paddingLeft) || 0;
      navTrack.scrollLeft = startCard.offsetLeft - gutter;
    }
  }

  // 5. Появление шапки после скролла первого экрана (для страниц кейсов)
  const revealHeader = document.querySelector('.site-header--reveal');
  const caseHero = document.getElementById('caseHero');

  if (revealHeader && caseHero) {
    const toggleHeaderVisibility = () => {
      const triggerPoint = caseHero.offsetHeight - 100;
      revealHeader.classList.toggle('is-visible', window.scrollY >= triggerPoint);
    };

    window.addEventListener('scroll', toggleHeaderVisibility, { passive: true });
    toggleHeaderVisibility();
  }

  // 6. Автоматическая смена цвета шапки на тёмном/насыщенном фоне
  const darkSections = document.querySelectorAll(
    '.case-hero, .case-goal, .case-typography, .zr-hero, .zr-about, .kz-hero, .kz-goal, .kz-results, .um-hero, .um-goal, .ot-creditbar-intro, .ot-satcredit-intro'
  );

  if (header && darkSections.length > 0) {
    const updateHeaderTheme = () => {
      const checkY = 45;
      let isOverDark = false;

      darkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= checkY && rect.bottom >= checkY) {
          isOverDark = true;
        }
      });

      header.classList.toggle('site-header--dark', isOverDark);
    };

    window.addEventListener('scroll', updateHeaderTheme, { passive: true });
    window.addEventListener('resize', updateHeaderTheme, { passive: true });
    updateHeaderTheme();
  }
});