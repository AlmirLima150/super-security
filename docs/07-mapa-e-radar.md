# 07 · Mapa e radar

[← JavaScript](06-javascript.md) · [Sumário](README.md) · [Próximo: Acessibilidade →](08-acessibilidade.md)

O radar do topo e o mapa da seção de orçamento usam **o mesmo mapa-base**
(`assets/img/mapa-recife-rmr.svg`), com recortes e escalas diferentes. Assim os dois
ficam sempre consistentes.

## Sumário
- [Mapa-base](#mapa-base)
- [Projeção](#projeção)
- [Unidades táticas](#unidades-táticas)
- [Radar (hero)](#radar-hero)
- [Mapa do formulário](#mapa-do-formulário)
- [Como as posições viram porcentagem](#como-as-posições-viram-porcentagem)
- [Como adicionar ou mover uma unidade](#como-adicionar-ou-mover-uma-unidade)

## Mapa-base

SVG de **930 × 713 px**, desenhado a partir de coordenadas aproximadas de latitude
e longitude. Camadas, de baixo para cima:

| Camada | Cor / estilo | Dados |
|--------|--------------|-------|
| Terra | `#13254F` | retângulo de fundo |
| Oceano | `#0A1128` | polígono a leste do litoral |
| Grade de coordenadas | branco 4,5% | a cada 0,05° |
| Linhas de profundidade | branco tracejado | litoral deslocado 0,008°, 0,018° e 0,032° |
| Arrecifes | dourado pontilhado | entre o Recife Antigo e o Pina |
| Limites municipais | branco tracejado | Recife/Jaboatão, Recife/Camaragibe, Olinda/Paulista |
| Avenidas | branco 16% | Agamenon, PE-15, Boa Viagem, Caxangá |
| Rodovias | branco 32% | BR-101, BR-232, BR-408 |
| Rios | azul `#5B7FC7` | Capibaribe, Beberibe, Tejipió, Jaboatão |
| Aeroporto | branco 50% | pista |
| Litoral | branco 55% | Paulista → Barra de Jangada |

> É um mapa **esquemático e ilustrativo**: as coordenadas são aproximadas.

## Projeção

Projeção equiretangular simples (suficiente para uma área pequena):

```
x = (longitude − LON0) × K
y = (LAT0 − latitude) × K
```

| Constante | Valor | Significado |
|-----------|-------|-------------|
| `LON0` | −35,20 | Borda oeste do mapa |
| `LAT0` | −7,84 | Borda norte do mapa |
| `K` | 1550 px/grau | Escala (≈ 14 px por km, pois 1° ≈ 110,6 km) |
| Extensão | −35,20 a −34,60 (lon) · −7,84 a −8,30 (lat) | 0,6° × 0,46° |

## Unidades táticas

| Rótulo | Rótulo curto (celular) | Longitude | Latitude | Lado do rótulo |
|--------|------------------------|-----------|----------|----------------|
| BASE CENTRAL · RECIFE | BASE | −34,892 | −8,060 | direita |
| UT-01 · OLINDA | 01 | −34,855 | −8,012 | direita |
| UT-02 · CASA FORTE | 02 | −34,918 | −8,034 | esquerda |
| UT-03 · BOA VIAGEM | 03 | −34,900 | −8,122 | direita |
| UT-04 · JABOATÃO | 04 | −34,918 | −8,170 | direita |
| AEROPORTO (anotação) | — | −34,921 | −8,125 | esquerda |

Locais e nomenclatura fictícios, usados só para ilustrar a cobertura.

## Radar (hero)

| Item | Valor |
|------|-------|
| Tamanho total | 480 × 480 (`.radar`) |
| Máscara circular | 420 × 420, raio 210 (`.radar__mask`, `inset: 6.25%`) |
| Escala do mapa | 1:1 → 210 px = 15 km |
| Centro | Base central |
| Anéis | 5 km (r 70), 10 km (r 140), 15 km (r 210, `anel-15km-graduacao.svg`) |
| Varredura | setor de 0,75 rad, gira 360° a cada 6 s |

Ordem das camadas dentro da máscara: mapa → vinheta → varredura → mira →
anéis → pinos → rótulos.

## Mapa do formulário

| Item | Valor |
|------|-------|
| Proporção | 536 × 300 (`aspect-ratio`) |
| Escala do mapa | 0,62 → ≈ 8,7 px por km |
| Base central em | (284, 140) |
| Anéis | 5 km e 10 km |
| Extras | norte (N ↑), escala de 5 km, legenda inline |

## Como as posições viram porcentagem

Para o radar e o mapa encolherem junto com a tela, tudo é posicionado em `%`
do contêiner:

```
x_px = cx + (x_mapa − x_base) × escala
y_px = cy + (y_mapa − y_base) × escala
left = x_px / largura_contêiner × 100%
top  = y_px / altura_contêiner  × 100%
```

O `.pin` é um ponto de tamanho zero nessa posição; o halo e o marcador são
centralizados com `translate(-50%, -50%)`, e o rótulo fica a 12px à direita
(`.pin--R`) ou à esquerda (`.pin--L`). O texto **não** escala, só a posição.

No celular (≤ 767px) o rótulo longo é trocado pelo curto e a legenda
`.map-legend` aparece abaixo do mapa.

## Como adicionar ou mover uma unidade

Exemplo: nova unidade em Paulista (longitude −34,875, latitude −7,940).

1. **Calcule a posição no mapa-base** (fórmula da [projeção](#projeção)):
   ```
   x_mapa = (−34,875 − (−35,20)) × 1550 = 503,75
   y_mapa = (−7,84 − (−7,940)) × 1550 = 155,0
   ```
   A base central fica em `x_base = 477,4` e `y_base = 341,0`.

2. **Converta para % do radar** (contêiner 420, centro 210, escala 1):
   ```
   left = (210 + (503,75 − 477,4) × 1) / 420 × 100 = 56,274%
   top  = (210 + (155,0 − 341,0) × 1) / 420 × 100 =  5,714%
   ```

3. **Converta para % do mapa do formulário** (536 × 300, base em 284 × 140, escala 0,62):
   ```
   left = (284 + (503,75 − 477,4) × 0,62) / 536 × 100 = 56,033%
   top  = (140 + (155,0 − 341,0) × 0,62) / 300 × 100 =  8,227%
   ```

4. **Copie um pino existente** no `index.html` (dentro de `.radar__mask` e de `.map`) e troque a posição e os rótulos:
   ```html
   <span class="pin pin--ut pin--R" style="left:56.274%;top:5.714%">
     <span class="pin__halo"></span><span class="pin__dot"></span>
     <span class="pin__label"><span class="label-long">UT-05 · PAULISTA</span><span class="label-short">05</span></span>
   </span>
   ```
   Use `pin--L` para o rótulo ficar à esquerda do ponto.

5. Acrescente o item na `figcaption.map-legend` das duas figuras.
6. Confira no navegador em 1440px e 390px se o rótulo não sobrepõe outro.

> Unidades fora do raio de 15 km ficam fora do círculo do radar.
