
$(document).ready(function () {
  "use strict";

  var window_width = $(window).width(),
    window_height = window.innerHeight,
    header_height = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen = window_height - header_height;


  $(".fullscreen").css("height", window_height)
  $(".fitscreen").css("height", fitscreen);

  //-------- Active Sticky Js ----------//
  $(".default-header").sticky({ topSpacing: 0 });


  if (document.getElementById("default-select")) {
    $('select').niceSelect();
  };

  $('.img-pop-up').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  // $('.navbar-nav>li>a').on('click', function(){
  //     $('.navbar-collapse').collapse('hide');
  // });


  //  Counter Js 

  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });

  $('.play-btn').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.active-works-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 100,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1,
      },
      768: {
        items: 1,
      }
    }
  });

  $('.active-gallery').owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    autoplay: true,
    nav: true,
    navText: ["<span class='lnr lnr-arrow-up'></span>",
      "<span class='lnr lnr-arrow-down'></span>"],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 6,
      }

    }
  });


  $('.active-blog-slider').owlCarousel({
    loop: true,
    dots: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 2000,
    smartSpeed: 1000,
    animateOut: 'fadeOut',
  })


  // Select all links with hashes
  $('.navbar-nav a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .on('click', function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 50
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

  $(document).ready(function () {
    $('#mc_embed_signup').find('form').ajaxChimp();

    fetch('https://peruacu.murilonascimento.tech/api/condutores')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('tbody');
        
        data.forEach(condutor => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
          <td>${condutor.nome}</td>
          <td>${condutor.apelido}</td>
          <td>${condutor.telefone.descricao}-${condutor.telefone.numero}</td>
          <td>${condutor.localidade.cidade}-${condutor.localidade.uf}</td>
          <td>${condutor.linguasEstrangeiras}</td>
          <td>${condutor.escolaridade}</td>
          <td>
            <button id="button-detalhes-condutor-${condutor.id}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#detalhes-condutor-${condutor.id}">
              <i class="fa fa-eye fa-lg"></i>
            </button>
          </td>

          <div class="modal fade" id="detalhes-condutor-${condutor.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title" id="exampleModalLongTitle">Detalhes do condutor</h3>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="">
                      <div><strong>Nome:</strong> ${condutor.nome}</div>
                      <div><strong>Apelido:</strong> ${condutor.apelido}</div>
                      <div><strong>E-mail:</strong> ${condutor.email}</div>
                      <div><strong>Telefone:</strong> ${condutor.telefone.descricao}-${condutor.telefone.numero}</div>
                      <div><strong>Línguas Estrangeiras:</strong> ${condutor.linguasEstrangeiras}</div>
                      <div><strong>Escolaridade:</strong> </div>
                      <div><strong>Cep:</strong> ${condutor.localidade.cep}</div>
                      <div><strong>Cidade:</strong> ${condutor.localidade.cidade}</div>
                      <div><strong>UF:</strong> ${condutor.localidade.uf}</div>
                      <div><strong>País:</strong> ${condutor.localidade.pais}</div>
                      <div><strong>Roteiros: ${condutor.roteiros}</strong></div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
              </div>
            </div>
          </div>
        `;

          $(`#detalhes-condutor-${condutor.id}`).on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget)
            var recipient = button.data('whatever') // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this)
            modal.find('.modal-title').text('New message to ' + recipient)
            modal.find('.modal-body input').val(recipient)
          })
          tbody.appendChild(tr);
        });
      })
      .catch(error => console.error('Erro:', error));
  });

});
