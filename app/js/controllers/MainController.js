class MainController{
    constructor(){
        let $ = document.querySelector.bind(document);
        this._formView = new FormView($('#root'));
        this._messageView = new MessageView($('#messageComponent'));
        this._message = new Message();
        this._usersList = new UsersList();

        this._usersService = new UsersService('https://private-21e8de-rafaellucio.apiary-mock.com/users');
        this._usersService.getUsers(err => console.log(err), res => this._usersList.saveUsers(res));

        this._usersListView = new UsersListView($('#root'));
        //this._usersListView.update(this._usersList);

        this._homeBtn = $('#homeBtn');
        this._listBtn = $('#listBtn');

    }

    addUser(event){
        event.preventDefault();

        console.log(event.target.cpf.value);
        
        if(CPFHelper.VerifyCPF(CPFHelper.HandleCPFStringFormat(event.target.cpf.value))){
            this._usersList.saveUser(this._createUser());
            this._message.text = 'Usuário adicionado com sucesso';
            this._messageView.update(this._message);
            this._clearForm();
        } else {
            this._message.text = 'Alguns dados precisam ser inseridos corretamente..';
            this._message.isError = true;
            this._messageView.update(this._message);
        }
    }

    _createUser(){
        return new User(
            this._inputName.value,
            this._inputCpf.value,
            this._inputPhone.value,
            this._inputEmail.value
        );
    }

    _clearForm(){
        this._inputName.value = '';
        this._inputCpf.value = '';
        this._inputPhone.value = '';
        this._inputEmail.value = '';       
    }

    _initFormElements(){
        let $ = document.querySelector.bind(document);
        this._inputName = $('#name');
        this._inputCpf = $('#cpf');
        this._inputPhone = $('#phone');
        this._inputEmail = $('#email');
    }

    handleRoutes(path){

        switch(path){
            case '/':
                this._formView.update({});
                this._initFormElements();
                this._homeBtn.classList += ' active';
                //this._listBtn.classList.remove('active');
            break;
            case '/list/':
                this._listBtn.classList += ' active';
                //this._homeBtn.classList.remove('active');
                this._usersService.getUsers(err => console.log(err), res => {
                    this._usersList.saveUsers(res);
                    this._usersListView.update(this._usersList);
                });
            default:
                return '404'
        }
    }

}