const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('registration-form');
const resetForm = document.getElementById('reset-form');

const popupContainer = document.querySelector('.popup-container');

const clearErrors = (form) => {
    form.querySelectorAll('.error-text').forEach(error => error.remove());
};

const clearSingleError = (input) => {
    if (input.nextElementSibling?.classList.contains('error-text')) {
        input.nextElementSibling.remove();
    }
};

const errorForm = (message, input) => {
    let errorTextElement = document.createElement('span');
    errorTextElement.className = 'error-text';
    errorTextElement.innerText = message;
    input.after(errorTextElement);
};

function closePopup() {
    if (!popupContainer) return;

    const popupElements = popupContainer.querySelectorAll('.popup__element');

    popupElements.forEach((element) => {
        element.classList.remove('active');
        popupContainer.classList.remove('active');
    })
}

async function serverAnswer(userData) {
    console.log('Отправляем данные:', userData);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000)

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`Возникла ошибка при отправке даных: ${response.status}`)
        }

        const result = await response.json();
        return result;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Сервер слишком долго не отвечает. Попробуйте позже.');
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}

const validationRules = {

    login: (value) => {
        if (value.length < 4 || value.length > 14) {
                return 'Login must contain from 4 to 14 characters';
        }
        return null;
    },

    email: (value) => {
        if (!/(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)/.test(value)) {
            return 'Email must contains @ symbol, email tocken and domen';
        }
        return null;
    },

    birthday: (value) => {
        const birthDate = new Date(value);
        const today = new Date();

        const minYear = today.getFullYear() - 18;
        const cutDate = new Date(today);
        cutDate.setFullYear(minYear);

        if (birthDate > today) {
            return 'Are you from the future?';
        } else if (birthDate > cutDate) {
            return 'Your age is too young';
        }
        return null;
    },

    telephone: (value) => {
         if (!/(^[78])(?=[0-9]{10}$)/.test(value)) {
            return 'Phone must contain 11 numbers and beggining from 7 or 8';
        }
        return null;
    },

    password: (value) => {
        if (value.length < 8 || value.length > 20) {
            return 'Passwords must contain from 8 to 20 characters';
        } else if (!/(?=.*[0-9])(?=.*[!$#_/\-*+=();%,.<>])/.test(value)) {
            return 'Passwords needs too contain numbers and special symbols !$#_/-*+=();%,.<>';
        }
        return null;
    },

    password__repeat: (value, originalPassword) => {
        return value !== originalPassword ? 'Passwords do not match' : null;
    },
}

const formValidation = (formElement, onSuccess) => {

    formElement.addEventListener('input', (event) => {
        if (event.target.tagName === 'INPUT') {
            clearSingleError(event.target);
        }
    });

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        let isValid = true;
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData);
        const { elements } = formElement;
        const formBtns = formElement.querySelectorAll('button');
        let passwordValue = '';

        clearErrors(formElement);

        for (const [key, value] of formData) {
            const trimmedValue = value.trim();
            const input = elements[key];
            const validateRule = validationRules[key];

            if (key === 'password') passwordValue = trimmedValue;

            if(!trimmedValue || /\s/.test(value)) {
                errorForm('Cannot be empty or contain empty symbols', input);
                isValid = false;
                continue;
            }

            if (validateRule) {
                const errorMessage = validateRule(trimmedValue, passwordValue);

                if (errorMessage) {
                    errorForm(errorMessage, input);
                    isValid = false;
                }
            }
            
        }

        if (isValid && (formBtns.length > 0)) {

            formBtns.forEach(btn => {
                btn.disabled = true;
                btn.classList.add('disabled');
            });

            try {
                const result = await serverAnswer(data);
                onSuccess(data, result);
                formElement.reset();
                closePopup();
            } catch (error) {
                alert(`Ошибка отправки: ${error.message}`);
            } finally {
                formBtns.forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('disabled');
                });
            }
        }
    });
};

if (loginForm) {
    formValidation(loginForm, (data, serverResponse) => {
        alert(`Пользователь ${data.login} вошёл в аккаунт.`);
        console.log('Сервер подтвердил запись с ID:', serverResponse.id);
    });
    
}

if (registrationForm) {
    formValidation(registrationForm, (data, serverResponse) => {
        alert(`Пользователь ${data.login} успешно зарагистрирован. На почту ${data.email} пришло уведомление`);
        console.log('Сервер подтвердил запись с ID:', serverResponse.id);
    });
}


if (resetForm) {
    formValidation(resetForm, (data, serverResponse) => {
        alert(`На почту ${data.email} пришло письмо для смены пароля.`);
        console.log('Сервер подтвердил запись с ID:', serverResponse.id);
    });
}
