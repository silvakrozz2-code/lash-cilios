import { services } from './services.js';

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if (loader) loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 800);

    const grid = document.getElementById('services-grid');
    const select = document.getElementById('service-select');

    if (grid && services) {
        services.forEach(s => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <div class="service-img-wrapper">
                    <img src="${s.image}" alt="${s.name}" loading="lazy">
                </div>
                <div class="service-body">
                    <h3>${s.name}</h3>
                    <p>${s.description}</p>
                    <div class="service-footer">
                        <span class="price-tag">R$ ${s.price}</span>
                        <span>🕒 ${s.duration} min</span>
                    </div>
                </div>
            `;
            card.onclick = () => openBookingModal(s);
            grid.appendChild(card);

            const opt = document.createElement('option');
            opt.value = s.name;
            // Guardamos o preço no atributo data para pegar depois
            opt.dataset.price = s.price; 
            opt.textContent = `${s.name} - R$ ${s.price}`;
            select.appendChild(opt);
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const serviceSelect = document.getElementById('service-select');
            const serviceName = serviceSelect.value;
            const servicePrice = serviceSelect.options[serviceSelect.selectedIndex].dataset.price;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const dataFormatada = date.split('-').reverse().join('/');
            
            // MENSAGEM COM VALOR INCLUÍDO
            const mensagemWhatsApp = 
`✨ *AGENDAMENTO NEO CÍLIOS LUXO* ✨
---------------------------------------

👑 *CLIENTE:* ${name.toUpperCase()}

💎 *SERVIÇO:* ${serviceName}
💰 *VALOR:* R$ ${servicePrice}

📅 *DATA:* ${dataFormatada}
⏰ *HORÁRIO:* ${time}

---------------------------------------
💖 _Estou pronta para brilhar!_
_Aguardando sua confirmação._ ✨`;

            const msgUrl = encodeURIComponent(mensagemWhatsApp);
            window.open(`https://wa.me/5541999484843?text=${msgUrl}`, '_blank');
            contactForm.reset();
        };
    }

    function openBookingModal(service) {
        const modal = document.createElement('div');
        modal.className = 'agendamento-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2 style="font-family:'Playfair Display',serif; margin-bottom:10px;">${service.name}</h2>
                <p style="color:var(--gold); font-weight:900; font-size:2rem; margin-bottom:20px;">R$ ${service.price}</p>
                <div class="horarios">
                    ${['10:00', '13:30', '15:00', '17:30', '19:00'].map(h => `
                        <button class="horario-btn" data-time="${h}">${h}</button>
                    `).join('')}
                </div>
                <button id="close-modal" style="margin-top:20px; background:none; border:none; color:#666; cursor:pointer; text-decoration:underline;">Fechar</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#close-modal').onclick = () => modal.remove();
        
        modal.querySelectorAll('.horario-btn').forEach(btn => {
            btn.onclick = () => {
                const msgQuick = `✨ *RESERVA RÁPIDA: NEO CÍLIOS LUXO* ✨\n\n💎 *SERVIÇO:* ${service.name}\n💰 *VALOR:* R$ ${service.price}\n⏰ *HORÁRIO:* ${btn.dataset.time}\n\n_Aguardo confirmação!_ 💖`;
                window.open(`https://wa.me/5541999484843?text=${encodeURIComponent(msgQuick)}`, '_blank');
                modal.remove();
            };
        });
    }

    if (typeof initParticles === 'function') initParticles();
});