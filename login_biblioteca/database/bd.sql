CREATE USER 'elton'@'localhost' IDENTIFIED BY 'SENAI123';

GRANT ALL PRIVILEGES ON *.* TO 'elton'@'localhost';

FLUSH PRIVILEGES;

use biblioteca;

alter table usuario add column password varchar(50) not null;

alter table usuario modify column id_usuario int not null auto_increment;

select * from usuario;

DELETE FROM usuario WHERE id_usuario = 1;

desc usuario;

SELECT password FROM usuario WHERE nome = 'Lavínia' and email = 'lavinia@example';

alter table usuario drop column id_endereco;

alter table emprestimo drop foreign key emprestimo_ifbk_2;



