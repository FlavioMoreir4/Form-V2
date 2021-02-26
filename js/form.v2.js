fbq('track', 'ViewContent');
    class Fetch {
        constructor(url, headers = {
            "Content-type": "application/x-www-form-urlencoded"
        }) {
            this.url = url
            this.headers = headers
        }
        Insert(data) {
            return fetch(this.url, {
                method: "POST",
                body: data
            }).then(res => res.json())
        }
        Consult(data, headers) {
            return fetch(this.url, {
                method: "POST",
                body: new URLSearchParams(data).toString(),
                headers: this.headers
            }).then(res => res.json())
        }
    }

    let getParams = function (e) {
            for (var a = window.location.search.substring(1).split("&"), t = 0; t < a.length; t++) {
                var n = a[t].split("=");
                if (n[0] == e) return n[1]
            }
            return !1
        },
        api = new Fetch("https://api.ipadraomilitar.com.br/leads/test/query.php", {
            "Content-type": "application/x-www-form-urlencoded",
            "Authorization": "Basic RGV2OlNIRTE1MDI5OEF3RHI="
        }),
        apiGoogle = new Fetch(
            "https://script.google.com/macros/s/AKfycbzlTZekdxhVR6mCSmZ4EpqAPZERRB6xiI49HHG3Ipepzo3yN2s_r094/exec", {
                "Content-type": "application/x-www-form-urlencoded",
            }),

        r = !!getParams("r") && getParams("r"),
        form = document.forms.form,
        f = form.elements.franquia.value,
        regiao = form.elements.regiao,
        nome_regiao = form.elements.nome_regiao,
        bairroList = document.getElementById("listBairro"),
        bairro = form.elements.bairro,
        responsavel = form.elements.responsavel,
        candidato = form.elements.candidato,
        idade = form.elements.idade,
        whatsapp = form.elements.whatsapp,
        grupo = form.elements.grupo,
        campanha = getParams("utm_campaign") ? form.campanha.value = decodeURI(getParams("utm_campaign")) :
        form.elements.campanha.value,
        idCurso = form.elements.curso.value,
        btnEnviar = form.elements.btnEnviar,
        franquias, results,
        Mask = {
            whats: "99 99999-9999"
        };

    idades = {
        IPMIL: [13, 14, 15, 16, 17, 18, 19, 20, 21],
        MIRIM: [06, 07, 08, 09, 10, 11, 12, 13]
    }
    for (var i = 0; i < idades[f].length; i++) {
        var o = document.createElement("option");
        o.text = idades[f][i],
            o.value = idades[f][i],
            idade.appendChild(o)

    }

    VMasker(whatsapp).maskPattern(Mask.whats);

    api.Consult({
        r: r,
        f: f
    }).then(e => {
        franquias = e
        console.log(franquias)
        for (var i = 0; i < e.length; i++) {
            var o = document.createElement("option");
            o.text = e[i].nome,
                o.value = e[i].id_irc,
                o.dataset.nome = e[i].nome,
                o.dataset.wpp = e[i].whatsapp_divulgador,
                o.dataset.consultor = e[i].divulgador,
                o.dataset.cidade = e[i].cidade,
                o.dataset.zona = e[i].grupo_regional,
                o.dataset.grupo = e[i].grupo,
                regiao.appendChild(o),
                1 == e.length && (
                    regiao.selectedIndex = 1,
                    document.getElementById("regG").style.display = "none",
                    Bairro()
                )
        }
    })

    function Bairro() {
        grupo.value = regiao.selectedOptions[0].dataset.grupo;
        nome_regiao.value = regiao.selectedOptions[0].dataset.nome;
        api.Consult({
            cidade: regiao.selectedOptions[0].getAttribute('data-cidade')
        }).then(e => {
            bairroList.innerHTML = ""
            bairro.value = ""
            for (var i = 0; i < e.length; i++) {
                var o = document.createElement("option");
                o.text = e[i].bairro,
                    o.value = e[i].bairro,
                    bairroList.appendChild(o)
            }
            bairro.style.display = ""
        })
    }

    function InsertDB() {
        document.querySelector(".process").classList.remove("is-hidden")
        api.Insert(new FormData(form)).then(e => {
                apiGoogle.Insert(new FormData(form)).then(e => {
                        Swal.fire({
                            title: 'Procurando Instrutor em ' + nome_regiao.value,
                            icon: 'success',
                            html: '<h3>Você será direcionado para WhatsApp, aguarde!</h3>',
                            showCloseButton: false,
                            showCancelButton: false,
                            showConfirmButton: false,
                            focusConfirm: false,
                            onBeforeOpen: () => {
                                Swal.showLoading()
                            }
                        })
                        console.log(e);
                    })
                    .catch(e => console.error("Google Error: " + e))
                console.log(e);
                fbq('track', 'Lead');
                fbq('trackCustom', 'Lead ' + nome_regiao.value);
                results = e
                GetWpp(e)
            })
            .catch(e => console.error("Error: " + e))

    }

    function Direct() {
        document.querySelector(".direct").classList.remove("is-hidden"),
            Swal.fire({
                title: 'Você já realizou seu cadastro!',
                icon: 'info',
                html: '<h3>Você será direcionado para WhatsApp, aguarde!</h3>',
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                focusConfirm: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                }
            })
        fbq('trackCustom', 'Leads Duplicados')
        GetWpp()
    }

    function GetWpp(e = null) {
        if (e['irc']) {
            Wpp = e['irc']["divulgador_whatsapp"].replace(/[- ()]/g, '')
        } else {
            Wpp = regiao.selectedOptions[0].getAttribute('data-wpp').replace(/[- ()]/g, '')
        }
        Loader(40, Wpp)
    }


    function Loader(e, tel = null) {
        let i = 0,
            a = document.createElement("a"),
            m = responsavel ?
            `*EU QUERO*\nCandidato: ${candidato.value}\nResponsável: ${responsavel.value}\nRegião: ${regiao.selectedOptions[0].dataset.nome}` :
            `*EU QUERO*\nCandidato: ${candidato.value}\nRegião: ${regiao.selectedOptions[0].dataset.nome}`,
            t = setInterval(function () {
                i >= 100 ? (clearInterval(t),
                    a.href =
                    `https://wa.me/55${encodeURIComponent(tel)}?text=${encodeURIComponent(m)}`,
                    a.innerHTML = '<i class="fab fa-whatsapp"></i> Abrir WhatsApp',
                    document.querySelectorAll(".load")
                    .forEach(e => {
                        e.style.display = "none"
                    }),
                    document.querySelector(".process").append(a),
                    document.querySelector(".direct").append(a),
                    a.click()) : i++
            }, e)
    }

    function Send() {
        Swal.fire({
            title: 'Processando!',
            allowOutsideClick: false,
            allowEscapeKey: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })
        document.getElementById("regiao_text").innerText = "em " + regiao.selectedOptions[0].dataset.nome
        form.classList.add("is-hidden")
        api.Consult({
            wpp: whatsapp.value,
            f: f.toLowerCase()
        }).then(e => {
            0 === e.length ? InsertDB() : Direct()
        })
        window.scrollTo(0, 0);
    }

    regiao.addEventListener('change', (e) => {
        Bairro()
    });

    (function () {
        'use strict'
        var forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                    if (form.checkValidity()) {
                        console.log("EXEC")
                        Send()
                    }
                    form.classList.add('was-validated')
                }, false)
            })
    })()
