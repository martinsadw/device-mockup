# Device Mockup

Uma biblioteca JavaScript para gerar dispositivos responsíveis usando apenas CSS.

## Sintaxe

```html
<device id="phone-device" dev-width="180" dev-height="320" dev-color="#111" dev-border="48 16" dev-border-radius="16">
   <dev-component dev-place="top" dev-position="-65" dev-width="12" dev-height="12" dev-color="#fff" dev-border-radius="6"></dev-component>
   <dev-component dev-place="top" dev-width="96" dev-height="6" dev-color="#fff" dev-border-radius="3"></dev-component>
   <dev-component dev-place="bottom" dev-width="80" dev-height="20" dev-color="#111" dev-border-size="2" dev-border-color="#fff" dev-border-radius="10"></dev-component>
   <dev-component dev-place="center" dev-color="#fff" dev-border-radius="8">
      <h2>Olá Mundo</h2>
   </dev-component>
</device>
```
