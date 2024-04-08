# e_hotel-CSI2532
CSI2532: Bases de données I\
Projet 2024

Membres:\
Mélina Rochon - 300238765\
Caterina Rose Moquin Bosi - 300214914\
Amani Louendriz - 300218319

#Étapes pour l’installation de l’application
1. Téléchargez nos fichiers sur github
2. Création de serveur et la base de donnée sur Postgresql:
   a. Créer un serveur sur Postgresql et nommez le: CSI-2532_e_hotel_projet
   b. Faitent un “Register” d’un serveur
   c. Remplir les données comme ci: Name: CSI-2532_e_hotel_projet. Avant de cliquer sur save, allez dans la section “Connection” et écrivez le hostname/address comme “localhost”. Assurez-vous que le port de connexion est bien 5432 et que le username est “postgres”. Choisissez un mot de passe et inscrivez le dans la section “Password”.
   d. Exécuter le fichier creation_db.sql. Cette exécution devrait créer la base de données localement. Si celle-ci ne fonctionne pas, continuez avec ces instructions (si elle a fonctionné, passez à la section f): sélectionnez “Create”, puis “Database…”. Écrivez “hotelio” dans la partie “Database”.
   e. Entrer le nom de la base de donnée, dans le champ Database: e_hotel_projet.
   f. Veuillez maintenant créer les tables dans la base de donnée en éxécutant le fichier e_hotel/src/main/resources.db.dbInit/ddlUpdated.sql
   g. Alimentez vos tables avec les 20 fichiers insert trouvés à e_hotel/src/main/resources.db.dbInit/insert/
   h. Dans e_hotel\src\main\resources\application.properties, insérez le même mot de passe que vous avez utilisé pour créer la base de donnée (même mot de passe que dans l’étape c) dans spring.datasource.password.
3. Exécution du Maven
   a. Assurez-vous que Maven est bien téléchargé
   b. Une fois Maven téléchargé, ajouter l’extension de «Maven for Java» sur votre VS Code, si ce n’est pas déjà fait :
   c. Clique droit sur e_hotel dans la section MAVEN. Cliquez sur Run Maven Commands -> install. Assurez vous que vous êtes bien dans le chemin suivant pendant que vous exécutez le Maven
   d. Avant de continuer, assurez-vous que votre version de Maven est compatible avec notre application.
   e. Si vous avez des problèmes avec le Maven, essayez d’ajouter ceci à la fin de votre e_hotel/pom.xml
   f. En allant dans vos path variables, copiez le path vers votre jdk (ex. C:Program Files\Files\Java\jdk-17.0.2) et collez le dans e_hotel/mvnw après JAVA_HOME=
   g. Veuillez maintenant compiler le Maven.
4. Exécution de l’application (Frontend)
   a. Assurez-vous d’avoir npm d’installé sur votre ordinateur.
   b. Ouvrez un nouveau terminal et assurez vous d'exécuter “cd e_hotelFrontEnd”
   c. Exécutez la commande npm install. Ne fermer pas le terminal une fois l’installation de npm terminée, car nous en aurons besoin plus tard.
   d. Maintenant, dans un autre terminal, faites un run du Java Project. Celui-ci est appelé: e_hotel. Une fois le run commencé, vous devriez voir le logo de SpringBoot dans votre terminal.
   e. Tout en gardant le terminal ouvert et en exécution, retournez au terminal que vous aviez utilisé pour exécuter npm install.
   f. Exécutez npm start.
   g. Si l’exécution ne vous y amène pas déjà, allez à l’adresse http://localhost:3000/
   h. Bravo! Vous avez terminé l’installation de notre application! Voici ce que vous devriez voir:

