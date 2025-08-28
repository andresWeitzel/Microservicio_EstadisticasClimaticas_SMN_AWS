<div align = "center">
  <img src="./doc/assets/img/data.png" > 
</div>

   <div align="right">
    <img width="25" height="25" src="./doc/assets/icons/devops/png/aws.png" />
    <img width="25" height="25" src="./doc/assets/icons/aws/png/lambda.png" />
    <img width="27" height="27" src="./doc/assets/icons/devops/png/postman.png" />
    <img width="29" height="27" src="./doc/assets/icons/devops/png/git.png" />
    <img width="25" height="25" src="./doc/assets/icons/aws/png/s3.png" />
    <img width="28" height="27" src="./doc/assets/icons/aws/png/api-gateway.png" />
    <img width="27" height="25" src="./doc/assets/icons/aws/png/parameter-store.png" />
    <img width="27" height="27" src="./doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
    <img width="27" height="28" src="./doc/assets/icons/aws/png/dynamo.png" />
  </div>

<br>

# Microservicio_EstadisticasClimaticas_SMN_AWS
Api Rest para la gestión de magnitudes climáticas del SMN como lo son temperatura, humedad, nubosidad, precipitación, etc de diversas estaciones meteorológicas implementado con JWT, NodeJS, DynamoDB, Systems Manager Parameter Store, Bucket S3, Api-Gateway, Serverless-Framework, Lambda, etc. Los servicios de aws se prueban en local. El código del proyecto y la documentación de este (menos doc técnica), ha sido desarrollado/a en inglés.

* [Dataset Servicio Meteorológico Nacional (Estadísticas Climáticas)](https://www.smn.gob.ar/descarga-de-datos)
* [Proyecto base para Microfrontend](https://www.smn.gob.ar/clima/vigilancia)
* [Playlist prueba de funcionalidad](https://www.youtube.com/playlist?list=PLCl11UFjHurDPyOkEXOR6JO-vUnYqd1FW)


<br>

## Índice 📜

<details>
 <summary> Ver </summary>
 
 <br>
 
### Sección 1)  Descripción, configuración y tecnologías

 - [1.0) Descripción del Proyecto.](#10-descripción-)
 - [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
 - [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
 - [1.3) Tecnologías.](#13-tecnologías-)


### Sección 2) Endpoints y Ejemplos 
 
 - [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)

### Sección 3) Prueba de funcionalidad y Referencias
 
 - [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
 - [3.1) Referencias.](#31-referencias-)


<br>

</details>



<br>

## Sección 1)  Descripción, configuración y tecnologías


### 1.0) Descripción [🔝](#índice-) 

<details>
  <summary>Ver</summary>
 <br>

### 1.0.0) Descripción General


 
 ### 1.0.1) Descripción Arquitectura y Funcionamiento
 

<br>

</details>


### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
  <br>
 
 
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/Microservicio_EstadisticasClimaticas_SMN_AWS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Instalamos todos los paquetes necesarios
```git
npm i
```
* Instalamos dynamodb con la configuración de librerias que se encuentran dentro de .dynamodb. Procedemos a instalar dicho servicio 
```git
sls dynamodb install
```
* Creamos un archivo para almacenar las variables ssm utilizadas en el proyecto (Más allá que sea un proyecto con fines no comerciales es una buena práctica utilizar variables de entorno).
  * Click der sobre la raíz del proyecto
  * New file
  * Creamos el archivo con el name `serverless_ssm.yml`. Este deberá estar a la misma altura que el serverless.yml
  * Añadimos las ssm necesarias dentro del archivo.
  ```git

      # AUTHENTICATION
      X_API_KEY : 'f98d8cd98h73s204e3456998ecl9427j'

      BEARER_TOKEN : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

      # API VALUES
      API_VERSION : 'v1'

      # DYNAMODB VALUES
      BIOET_PRECIOS_TABLE_NAME : 'estadisticas-climaticas'
      REGION : 'us-east-1'
      ACCESS_KEY_RANDOM_VALUE: 'access_key_random_value'
      SECRET_KEY_RANDOM_VALUE: 'secret_key_random_value'
      ENDPOINT: "http://localhost:8000"

  ```
* Instalamos el sdk client de dynamodb para las operaciones de db necesarias
``` git
npm install @aws-sdk/client-dynamodb
```     
* Instalamos el sdk lib de dynamodb para las operaciones de db necesarias
``` git
npm i @aws-sdk/lib-dynamodb
```
* Configuramos las credenciales de aws seteadas en el proyecto (Verificar ssm).
```git
aws configure
```
```git
AWS Access Key ID .... : access_key_random_value
AWS Secret Key ID .... : secret_key_random_value
Default.... [us-east-1] : us-east-1
Default outpu..... : json
```
* Visualizamos que se hayan seteado las credenciales
```git
aws configure list
```
* Los siguientes scripts configurados en el package.json del proyecto son los encargados de
   * Ejecutar el servicio de dynamoDB en memoria (script dynamodb-service)
   * Realizar la migración de las tablas (script dynamodb-migrate)
   * Levantar serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "dynamodb-service": "java -Djava.library.path=.dynamodb/DynamoDBLocal_lib -jar .dynamodb/DynamoDBLocal.jar -sharedDb -inMemory",
    "dynamodb-migrate": "sls dynamodb start --migrate",
    "serverless-offline": "sls offline start",
    "start": "concurrently --kill-others \"npm run dynamodb-service\" \"npm run dynamodb-migrate\" \"npm run serverless-offline\""
  },
```
* Ejecutamos los scripts configurados
```git
npm start
```
* Si se ha realizado la migración de tablas previamente (ejecutado el comando anterior), al momento de una nueva ejecución con el mismo, surgiran errores en consola. Esto esta contemplado ya que la migración levanta el servicio de dynamodb, pero `se podrá ejecutar el servicio sin problemas`. Una alternativa es usar directamente el comando `sls offline start` ya que se corrió inicialmente y al menos una vez dicha migración. 


 

 
 
<br>

</details>


### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>
 


* Creamos un entorno de trabajo a través de algún ide, luego de crear una carpeta nos posicionamos sobre la misma
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Inicializamos un template de serverles
```git
serverless create --template aws-nodejs
```
* Inicializamos un proyecto npm
```git
npm init -y
```
* Instalamos serverless offline 
```git
npm i serverless-offline --save-dev
```
* Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-offlline
``` 
* Instalamos serverless ssm 
```git
npm i serverless-offline-ssm --save-dev
```
* Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-offlline-ssm
```  
* Instalamos serverless-dynamoDB-local (No dynamoDB). Importante que sea --save y NO --save-dev
```git
npm install serverless-dynamodb-local --save
```
 * Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-dynamodb-local
```
 * Reemplazamos la plantila serverless.yml inicial por la siguiente como modelo base (cambiar nombre, etc)...
```yml

service: nombre

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region : us-west-1
  memorySize: 512
  timeout : 10

plugins:
    - serverless-dynamodb-local
    - serverless-offline-ssm
    - serverless-offline  

functions:
  hello:
    handler: handler.hello

custom:
  serverless-offline:
    httpPort: 4000
    lambdaPort: 4002    
  serverless-offline-ssm:
    stages:
      - dev
  dynamodb:
    stages:
      - dev
```
* Instalamos prettier para indentaciones
``` git
npm i prettier --save
```
* Instalamos node-input-validator para para validaciones de atributos en request, objetos de clases, etc.
``` git
npm i node-input-validator --save
```
* Instalamos el sdk client de dynamodb para las operaciones de db necesarias
``` git
npm install @aws-sdk/client-dynamodb
```     
* Instalamos el sdk lib de dynamodb para las operaciones de db necesarias
``` git
npm i @aws-sdk/lib-dynamodb
```   
* Descargamos la Java Runtime Engine (JRE) versión 6.x o posterior. [Descargar desde aquí](https://www.oracle.com/java/technologies/downloads/)
* Descargamos el .jar que contendrá toda la configuración para la instalación . [Descargar desde aquí](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)
* Según el .jar que descarguemos tenemos que setear la región correspondiente para su [zona de disponibilidad](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) en las credenciales de conexión de dynamo (si descargamos US West (Oregon) Region será 'us-west-2').
* Una vez descargado el .jar en formato .tar descomprimimos y copiamos todo su contenido dentro de la carpeta que se ha creado de dynamo en el proyecto (.dynamodb). Si esta carpeta no está, la creamos dentro de proyecto.
* Procedemos a instalar el servicio de dynamodb
```git
sls dynamodb install
```
* Creamos un archivo para almacenar las variables ssm utilizadas en el proyecto (Más allá que sea un proyecto con fines no comerciales es una buena práctica utilizar variables de entorno).
  * Click der sobre la raíz del proyecto
  * New file
  * Creamos el archivo con el name `serverless_ssm.yml`. Este deberá estar a la misma altura que el serverless.yml
  * Añadimos las ssm necesarias dentro del archivo.
  ```git

      # AUTHENTICATION
      X_API_KEY : 'f98d8cd98h73s204e3456998ecl9427j'

      BEARER_TOKEN : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

      # API VALUES
      API_VERSION : 'v1'

      # DYNAMODB VALUES
      BIOET_PRECIOS_TABLE_NAME : 'estadisticas-climaticas'
      REGION : 'us-east-1'
      ACCESS_KEY_RANDOM_VALUE: 'access_key_random_value'
      SECRET_KEY_RANDOM_VALUE: 'secret_key_random_value'
      ENDPOINT: "http://localhost:8000"

  ```
* Configuramos las credenciales de aws seteadas en el proyecto (Verificar ssm).
```git
aws configure
```
```git
AWS Access Key ID .... : access_key_random_value
AWS Secret Key ID .... : secret_key_random_value
Default.... [us-east-1] : us-east-1
Default outpu..... : json
```
* Visualizamos que se hayan seteado las credenciales
```git
aws configure list
```
* Instalamos la dependencia para la ejecución de scripts en paralelo
``` git
npm i --save-dev concurrently
```
* Los siguientes scripts configurados en el package.json del proyecto son los encargados de
   * Ejecutar el servicio de dynamoDB en memoria (script dynamodb-service)
   * Realizar la migración de las tablas (script dynamodb-migrate)
   * Levantar serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "dynamodb-service": "java -Djava.library.path=.dynamodb/DynamoDBLocal_lib -jar .dynamodb/DynamoDBLocal.jar -sharedDb -inMemory",
    "dynamodb-migrate": "sls dynamodb start --migrate",
    "serverless-offline": "sls offline start",
    "start": "concurrently --kill-others \"npm run dynamodb-service\" \"npm run dynamodb-migrate\" \"npm run serverless-offline\""
  },
```
* Ejecutamos los scripts configurados
```git
npm start
```
* Si se ha realizado la migración de tablas previamente (ejecutado el comando anterior), al momento de una nueva ejecución con el mismo, surgiran errores en consola. Esto esta contemplado ya que la migración levanta el servicio de dynamodb, pero `se podrá ejecutar el servicio sin problemas`. Una alternativa es usar directamente el comando `sls offline start` ya que se corrió inicialmente y al menos una vez dicha migración. 



<br>

</details>


### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>

| **Tecnologías** | **Versión** | **Finalidad** |               
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Servicios AWS |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Manejo de Variables de Entorno |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | Gestor, Autenticación, Control y Procesamiento de la Api | 
| [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingBucket.html) | 3.0 | Contenedor de Objetos | 
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos | 
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |

</br>


| **Plugin** | **Descripción** |               
| -------------  | ------------- |
| [Serverless Plugin](https://www.serverless.com/plugins/) | Librerías para la Definición Modular |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | Este complemento sin servidor emula AWS λ y API Gateway en entorno local |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |  busca variables de entorno que cumplen los parámetros de SSM en el momento de la compilación y las sustituye desde un archivo  |
| [serverless-s3-local](https://www.serverless.com/plugins/serverless-s3-local) | complemento sin servidor para ejecutar clones de S3 en local

</br>


| **Extensión** |              
| -------------  | 
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |

<br>

</details>


<br>


## Sección 2) Endpoints y Ejemplos. 


### 2.0) Endpoints y recursos [🔝](#índice-) 

<details>
  <summary>Ver</summary>
<br>

<br>

</details>

<br>


## Sección 3) Prueba de funcionalidad y Referencias. 


### 3.0) Prueba de funcionalidad [🔝](#índice-) 

<details>
  <summary>Ver</summary>
<br>


</details>


### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>

 #### Dynamodb installation
 * [DynamoDB en local ejecutable](https://cloudkatha.com/how-to-install-dynamodb-locally-on-windows-10/#:~:text=How%20to%20Install%20DynamoDB%20Locally%20on%20Windows%2010,Use%20DynamoDB%20Locally%20to%20Create%20a%20Table%20)


#### DynamoDB teoría
* [Guía DynamoDB](https://www.dynamodbguide.com/local-secondary-indexes/)
* [Doc Oficial Api DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html#http-api-dynamo-db-create-table)
* [Definicion de atributos](https://tipsfolder.com/range-key-dynamodb-ac5558671b26d5d7f2a34cd9b138c01e/#:~:text=The%20range%20attribute%20is%20the%20type%20key%20of,%28which%20means%20it%20can%20only%20hold%20one%20value%29.)
* [Clave de Partición vs Ordenación](https://stackoverflow.com/questions/27329461/what-is-hash-and-range-primary-key)
* [Expresiones de Filtros en Dynamodb](https://www.alexdebrie.com/posts/dynamodb-filter-expressions/)
* [Ejemplos de Expresiones de Filtros en Dynamodb](https://dynobase.dev/dynamodb-filterexpression/)

#### Dynamodb operations sdk v-3
* [Operations](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
* [Operations API-REST](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Videotutoriales 
* [Dynamodb local config](https://www.youtube.com/watch?v=-KRykmVIoV0&t=663s)
* [Crud Dynamodb](https://www.youtube.com/watch?v=hOcbHz4T0Eg)

#### Dynamodb examples
* [Plugin serverless](https://www.serverless.com/plugins/serverless-dynamodb-local)
* [Creación de varias tablas](https://stackoverflow.com/questions/47327765/creating-two-dynamodb-tables-in-serverless-yml)
* [Ejemplo dynamodb serverless](https://github.com/serverless/examples/tree/v3/aws-node-rest-api-with-dynamodb-and-offline)
* [Dynamodb SDK examples](https://github.com/aws-samples/aws-dynamodb-examples/tree/master/DynamoDB-SDK-Examples/node.js)
* [CRUD Dynamodb](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Dynamodb code
* [Api Rest Base](https://github.com/jacksonyuan-yt/dynamodb-crud-api-gateway)


#### Herramientas 
 * [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0&libs=aws4)

#### Api Gateway
 * [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
 * [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)

 #### Librerías
 * [Validación de campos](https://www.npmjs.com/package/node-input-validator)

 #### Package.json
 * [Configuración de scripts en paralelo](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)


<br>

</details>
