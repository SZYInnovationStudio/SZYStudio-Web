document.addEventListener('DOMContentLoaded', function() {
    const studioAscii = `
   _____ ________     __ 
  / ____|___  /\\ \\   / / 
 | (___    / /  \\ \\_/ /  
  \\___ \\  / /    \\   /   
  ____) |/ /__    | |    
 |_____//_____|   |_|    
                         
 欢迎访问SZY创新工作室官网！                         
    `;
    
    try {
        console.clear();
        console.log('%c' + studioAscii, 'color: #0d6efd; font-weight: bold;');
        console.log('正在预加载...');
    } catch (e) {
        console.log(studioAscii);
        console.log('正在预加载...');
    }
    
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                    navbarToggler.click();
                }
            }
        });
    });

    const sideTopBtn = document.getElementById('side-top');
    const sideStatusBtn = document.getElementById('side-status');
    const sideLanguageBtn = document.getElementById('side-language-en');

    if (sideTopBtn) {
        sideTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        sideTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (sideStatusBtn) {
        sideStatusBtn.addEventListener('click', () => {
            window.open('https://status.szystudio.cn', '_blank', 'noopener');
        });
        sideStatusBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open('https://status.szystudio.cn', '_blank', 'noopener');
            }
        });
    }

if (sideLanguageBtn) {
    const switchLanguage = () => {
        const currentPath = window.location.pathname;
        const hostname = window.location.hostname;
        
        const isEnglish = currentPath.startsWith('/en/') || currentPath === '/en';
        
        let targetUrl;
        if (isEnglish) {
            const cnPath = currentPath.replace(/^\/en/, '') || '/';
            targetUrl = `https://www.szystudio.cn${cnPath}`;
            sideLanguageBtn.setAttribute('aria-label', 'Switch to English');
        } else {
            const enPath = currentPath === '/' ? '/en/' : `/en${currentPath}`;
            targetUrl = `https://www.szystudio.cn${enPath}`;
            sideLanguageBtn.setAttribute('aria-label', '切换到中文');
        }
        
        window.open(targetUrl, '_self', 'noopener');
    };

    sideLanguageBtn.addEventListener('click', switchLanguage);
    sideLanguageBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchLanguage();
        }
    });
    
    const updateButtonState = () => {
        const currentPath = window.location.pathname;
        const isEnglish = currentPath.startsWith('/en/') || currentPath === '/en';
        
        if (isEnglish) {
            sideLanguageBtn.textContent = 'ZH';
            sideLanguageBtn.setAttribute('aria-label', '切换到中文');
        } else {
            sideLanguageBtn.textContent = 'EN';
            sideLanguageBtn.setAttribute('aria-label', 'Switch to English');
        }
    };
    
    updateButtonState();
}

window.addEventListener('load', function() {
    const studioAsciiBackup = `
   _____ ________     __ 
  / ____|___  /\\ \\   / / 
 | (___    / /  \\ \\_/ /  
  \\___ \\  / /    \\   /   
  ____) |/ /__    | |    
 |_____//_____|   |_|    
                         
 欢迎访问SZY创新工作室官网！                         
    `;
    console.log('\n完全加载成功！');
})});