# festfeeet
Desafio Bootcamp Gostask
https://github.com/rocketseat-education/bootcamp-gostack-desafio-10

### 🔽 Requisitos
1. Ter o NodeJs e Yarn instalado
2. Ter banco de dados do Redis e PostgreSQL em execução , pode ser com docker
3. Um dispositivo ou emulador Android conectado ao computador




### :rocket: Iniciando com o backend
1. ``cd api``
2. ``yarn``
3. ``Criar o arquivo .env com base no .env.example``
4. ``yarn sequelize db:migrate``
5. ``yarn sequelize db:seed:all``
6. ``yarn dev``
7. ``yarn queue para monitorar os jobs de emails``

### 💻 Iniciando com o Front-end 
1. ``cd web``
2. ``yarn``
3. ``yarn start``

Existe um usuário administrador padrão: admin@fastfeet.com / 123456

🎨 Layout
O layout do sistema está em anexo como um arquivo .xd.

Você pode utilizar a seguinte URL para visualizar todas as telas: Visualizar

### 📱Iniciando com o Mobile (Apenas Android)
1. ``cd mobile``
2. ``yarn``
3. ``adb reverse tcp:9090 tcp:9090 (Reactotron)``
4. ``adb reverse tcp:3333 tcp:3333 (Acesso a API no emulador)``
5. ``react-native start``
6. ``react-native run-android``
