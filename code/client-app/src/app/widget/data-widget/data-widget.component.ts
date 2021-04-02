import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-data-widget',
  templateUrl: './data-widget.component.html',
  styleUrls: ['./data-widget.component.sass']
})
export class DataWidgetComponent implements OnInit {
  constructor() {}
  ngOnInit() {
    $('#single_slide_autoplay').owlCarousel({
      items: 1,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true
    });
    $('.play').on('click', function() {
      $('#single_slide_autoplay').trigger('play.owl.autoplay', [3000]);
    });
    $('.stop').on('click', function() {
      $('#single_slide_autoplay').trigger('stop.owl.autoplay');
    });
    $(document).on(
      'click',
      '.to-do-list .form-check-label .form-check-input',
      function() {
        $(this)
          .parent('label')
          .toggleClass('line-through');
      }
    );
    $(document).on('click', '.todo-remove', function() {
      $(this)
        .closest('li')
        .remove();
      return false;
    });
    $(document).on('click', '.panel .tools .fa-times', function() {
      $(this)
        .parents('.panel')
        .parent()
        .remove();
    });
    // todo
    $('.tdl-new').on('keypress', function(e) {
      var code = e.keyCode ? e.keyCode : e.which;
      if (code == 13) {
        var v = $(this).val();
        var s = v.replace(/ +?/g, '');
        if (s == '') {
          return false;
        } else {
          $('.tdl-content ul').append(
            "<li class='clearfix'> <div class='form-check m-l-10'> <label class='form-check-label'> <input class='form-check-input' type='checkbox' value=''>" +
              v +
              "<span class='form-check-sign'> <span class='check'></span> </span> </label> </div> <div class='todo-actionlist pull-right clearfix'> <a href='#' class=''> <i class='material-icons'>clear</i> </a> </div> </li>"
          );
          $(this).val('');
        }
      }
    });
    // for dynamically created a tags
    $('.tdl-content').on('click', 'a', function() {
      var _li = $(this)
        .parent()
        .parent('li');
      _li
        .addClass('remove')
        .stop()
        .delay(100)
        .slideUp('fast', function() {
          _li.remove();
        });
      return false;
    });
  }
}
