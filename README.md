# Loci Arena — Website Oficial

Website oficial de apresentação do **Loci Arena**, um jogo 2D Battle Arena multiplayer com temática de fantasia medieval.

## ⚔️ Sobre o Projeto

O site foi construído com foco em contar a história do mundo, apresentar a ambientação e servir como vitrine interativa dos personagens/campeões jogáveis.

### 🌟 Destaques
- **Estética Medieval / Fantasy**: Paleta inspirada em pergaminho, floresta, ouro e vinho antigo com tipografia serifada clássica.
- **Crônica do Mundo**: Apresentação da lore da Arena Ancestral e dos objetos táticos do mapa (pilares, fontes de éter, folhagens).
- **Vitrine Interativa de Campeões**: Carrossel responsivo em JavaScript puro com suporte a *touch swipe*, navegação anterior/próximo e paginação dinâmica.
  - **Arya**: A Guerreira Gentil (Protetora / Tanque)
  - **Mage**: Arquimago do Éter (Dano Arcano à Distância)
  - **Warrior**: O Berserker (Combatente de Linha de Frente)
- **Fácil Extensibilidade**: Basta duplicar um bloco de `.champion-card` no HTML para adicionar novos personagens.
- **Powered by Loci2D**: Servidor autoritativo de rede de baixa latência desenvolvido em Rust.

## 🚀 Como Executar Localmente

Não requer instalação de dependências ou build complexo. Basta abrir o `index.html` em qualquer navegador moderno ou rodar um servidor estático local:

```bash
# Com Python 3
python3 -m http.server 8000
```

Abra no navegador em `http://localhost:8000`.

## 📦 Deploy

Configurado para deploy contínuo e estático no Render através do arquivo [`render.yaml`](render.yaml).
