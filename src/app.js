import './assets/scss/app.scss';
import 'whatwg-fetch';
import $ from 'cash-dom';


export class App {
  initializeApp() {
    $('.load-username').on('click', (e) => {
      const userName = $('.username.input').val();

      if (!this.validateUserName(userName)) {
        return false;
      };

      fetch('https://api.github.com/users/' + userName)
        .then((response) => response.json())
        .then((body) => {
          this.profile = body;
          this.update_profile();
        })

    })

  }

  update_profile() {
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text( '@' + this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }

  validateUserName(userName) {
    const validationRegex = /^[0-9a-z_-]+$/;

    if (!(userName !== '' && validationRegex.test(userName))) {
      $('.username').addClass('is-danger');
      $('.load-username').addClass('is-danger');
      return false;
    } else {
      $('.username').removeClass('is-danger');
      $('.load-username').removeClass('is-danger');
    }
    return true;
  }
}
