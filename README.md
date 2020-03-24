# Cambio-Dolar

By: Chana

Details: First try using Node JS

Excercise Instructions:

1) Hace un script en node que pregunte a esta api el valor del dolar cada 1 minuto y que guarde el valor en una variable. Cada vez que reciba el valor tiene que compararlo con el valor anterior y si es distinto tiene que mostrarlo con fecha y hora.

https://mindicador.cl/api

2) En base al código que hiciste ayer, tienes que crear otro archivo que se llame bot.js que implemente este paquete NPM https://github.com/mullwar/telebot .Tienes que investigar como obtener un token de telegram bot
al bot le tengo que decir "dolar" y me tiene que devolver el último valor del dolar. Puntos extras si implementas un archivo .gitignore y borras los node_modules del repositorio

3) - Convertir el comando dolar de texto a /command usando regexp (el /command también se configura en BotFather)
- Modelar y crear un esquema de base de datos para guardar usuarios de telegram usando https://mongoosejs.com/
(tienes que instalar mongodb antes)

4) tienes que hacer comandos nuevos /subscribe y /unsubscribe /subscription_status
al hacer subscribe tiene que guardar mi usuario en db y tiene que tener un atributo que se llame subscription (booleano)
el unsubscribe cambia ese atributo a falso
y el status me dice si estoy subscrito o no
el subscribe es solo para usuarios por ahora
así que tienes que validar eso
si lo escribo desde un grupo no se podría
