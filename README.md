# Form-V2
Formulário Ajax para captura de leads.
> **Já uso esse algoritmo a muito tempo e é sensacional**

Sem tempo pra deixar o código fácil para interpretação e muito menos pra explicar melhor, mas se quiser da uma fuçada, fica a vontade.
Quando eu tiver um tempo volto a focar nesse projeto.

## Ações
### Envio para Back-End em PHP
Tratamento dos dados para consultas e armazenamento em Banco de Dados (MySQL).
> **Ainda não subir o algoritmo do PHP, fica pra próxima**
> ***Sorry***
### Pixel Facebook
 ```js
fbq('track', 'Lead');
fbq('trackCustom', 'Leads Duplicados')
```

### Google Planilhas
```js
apiGoogle.Insert(new  FormData(form)).then(e  => {
	console.log(e);
}).catch(e  =>  console.error("Google Error: " + e))
```

### Envia o usuário para WhatsApp definido
```js
t = setInterval(function () {
	i >= 100 ? (clearInterval(t),
	a.href =`https://wa.me/55${encodeURIComponent(tel)}?text=${encodeURIComponent(m)}`,
	a.innerHTML = '<i class="fab fa-whatsapp"></i> Abrir WhatsApp',
	document.querySelectorAll(".load").forEach(e  => {
		e.style.display = "none"
	}),
	document.querySelector(".process").append(a),
	document.querySelector(".direct").append(a),
	a.click()) : i++
}, e)
```
