define( [ 'jquery' ],
        function() {
            validated = false,

            this.checkEmail = function(field) {
                var email = $('#' + field)[0].value;
                var filter = /^\w(\w|\.|\-|\_)+@\w+(.(\w)+){0,3}\.(\w){2,6}$/g;
                if (filter.test(email)) {
                    return true;
                } else {
                    return false;
                }
            }

            this.checkPassLenght = function(field) {
                var pass = $('#' + field)[0].value;
                if (pass.length >= 6) {
                    return true;
                } else {
                    return false;
                }
            }

            this.checkConfirmPass = function() {
                if ($('#password')[0].value == $('#confpass')[0].value) {
                    return true;
                } else {
                    return false;
                }
            }

            this.checkField = function(field) {
                switch (field) {
                case 'email':
                    var valid = checkEmail(field);
                    var msg = 'Please, enter valid email.';
                    break;
                case 'password':
                    var valid = checkPassLenght(field);
                    var msg = 'Use at least 6 characters.'
                    break;
                case 'confpass':
                    var valid = checkConfirmPass();
                    var msg = 'These passwords don\'t match. Try again?'
                    break;
                }

                var $error_field = $('#' + field);
                var $group = $error_field.closest('.form-group');
                if (!valid) {
                    $group.addClass('has-error');
                    $group.find('.help-block').html(msg).removeClass('hidden');
                } else {
                    $group.removeClass('has-error');
                    $group.find('.help-block').addClass('hidden');
                }
            }

            this.focusField = function(field) {
                var $error_field = $('#' + field);
                var $group = $error_field.closest('.form-group');
                $group.removeClass('has-error');
                $group.find('.help-block').addClass('hidden');
            }

            this.checkAll = function() {
                return (this.checkEmail('email')
                        && this.checkPassLenght('password') && this
                        .checkConfirmPass());
            }
            this.checkAllLogin=function(){
                return(this.checkEmail('email')
                && this.checkPassLenght('password'));
            }

            return this;

        })