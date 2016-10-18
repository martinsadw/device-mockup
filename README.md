# Device Mockup

Uma biblioteca JavaScript para gerar dispositivos responsíveis usando apenas HTML e CSS.

## Exemplo

```html
<device id="phone-device" dev-width="180" dev-height="320" dev-color="#111" dev-border-size="48 16" dev-border-radius="16">
   <dev-component dev-place="top" dev-position="-65" dev-width="12" dev-height="12" dev-color="#fff" dev-border-radius="6"></dev-component>
   <dev-component dev-place="top" dev-width="96" dev-height="6" dev-color="#fff" dev-border-radius="3"></dev-component>
   <dev-component dev-place="bottom" dev-width="80" dev-height="20" dev-color="#111" dev-border-size="2" dev-border-color="#fff" dev-border-radius="10"></dev-component>
   <dev-component dev-place="outer-right" dev-position="-70" dev-width="3" dev-height="40" dev-color="#626262" dev-border-radius="1.5"></dev-component>
   <dev-component dev-place="outer-left" dev-position="-80" dev-width="3" dev-height="40" dev-color="#626262" dev-border-radius="1.5"></dev-component>
   <dev-component dev-place="outer-left" dev-position="-125" dev-width="3" dev-height="40" dev-color="#626262" dev-border-radius="1.5"></dev-component>
   <dev-component dev-place="center" dev-color="#fff" dev-border-radius="8">
      <h2>Olá Mundo</h2>
   </dev-component>
</device>
```

## Instalação

#### NPM

```bash
  $ npm install device-mockup
```

#### Bower

```console
  $ bower install device-mockup
```

## Uso

#### Dispositivos

Dispositivos são criados utilizando a tag `<device>`. Todo dispositivo precisa de possuir um _id_.

* __dev-width:__ Largura do dispositivo.
* __dev-height:__ Altura do dispositivo.
* __dev-color:__ Cor de preenchimento.
* __dev-border-size:__ Tamanho das bordas.
* __dev-border-radius:__ Tamanho do arredondamento das bordas.

#### Componentes

Componentes são criados utilizando a tag `<dev-component>`. Componentes por padrão ficam centralizados mas podem ser reposicionados utilizando o atributo `dev-position`.

* __dev-place:__ Define aonde o componente será exibido.
* __dev-position:__ Define o deslocamento do componente em relação ao centro. A direção em que o componente será deslocado depende da posição do mesmo.
* __dev-width:__ Largura do componente
* __dev-height:__ Altura do componente
* __dev-color:__ Cor de preenchimento
* __dev-border-size:__ Tamanho das bordas
* __dev-border-color:__ Cor das bordas
* __dev-border-radius:__ Tamanho do arredondamento das bordas.

#### Posicionamento de componentes

É possivel escolher aonde os componentes serão exibidos.  
Valores possíveis são: center, top, right, bottom, left, outer-top, outer-right, outer-bottom, outer-left

## Licença

Licença MIT.  
Copyright (c) 2016 André F. Martins  
Copyright (c) 2016 RooTM Soluções em Sistemas Multimídia Ltda
