insert into bb_users
(name, password, profile_pic)
values
($1, $2, $3)
returning name, profile_pic