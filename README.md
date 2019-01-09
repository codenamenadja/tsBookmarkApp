    1.firstCommit
        A.npm installation
            -dev
                1.typescript
    
    2.npm settings
        A.npm installation
            -dep
                1.express
                2.morgan
                3.body-parser
                4.error-handler
                5.ejs
                6.jquery
                7.method-override
                8.cookie-parser
            -dev
                1.grunt
                2.grunt-concurrent
                3.grunt-contrib-copy
                4.grunt-contrib-watch
                5.grunt-nodemon
                6.grunt-ts
                7.grunt-webpack
                8.nodemon
                <!-- 9.time-grunt // deprecated -->
                9. open
                10.ts-loader
                11.webpack
                12.grunt-browser-sync
    
    3.npm setting
        A.definition packages installation via npm
            -dep
                1.@types/express
                2.@types/body-parser
                3.@types/cookie-parser
                4.@types/errorhandler
                5.@types/method-override
                6.@types/morgan
                7.@types/jquery
    
    4.config ts-configs
        A.addtional settings
            1.module:commonjs
            2.target:es5
            3.types includes : jquery
            4.compile excludes: "node_module" dir

    5.setup common API
        A.common/types/Item.ts
            -북마크 아이템에 대한 인터페이스 export
        B.common/types/Iresponse.ts // imports A
            -북마크 아이템 등록성공여부와 해당 아이템의 인터페이스를 포함한 서버-response 인터페이스 export
        C.common/validator.ts
            -URL이 유효한 지 검증하는 함수 export
        D.common/template.ts // imports A
            -DOM요소에 프레임이 되는 DIV포함 ITEM을 순회 배치하여 string으로 통으로 돌려주는 함수 export

    6.index.js = npm/nodejs 엔트리 스타팅포인트
        A.http 모듈과 server모듈을 불러옴
            - http모듈: 일반적인 node내장 http모듈
            - server모듈: express app을 배급받으며, 그에 대한 미들웨어 설정과 라우팅설정까지 포함된 express();된 app을 class로 처리해서 받아올 수 있도록 한다.
                1.server.Server라는 명으로 클래스가 exports됨
                2.클래스 내부의 static bootstrap()이라는 매서드를 통해서 객체를 할당 받음.(싱글턴객체 아님)
                3.constructor내부에 private메서드를 실행시키는 과정이 포함되 this.app에 대한 설정을 마치고 app:express.Application객체를 생성한다.
        B.http모듈과 express app을 결합
            1.httpServer.createServer(app);
            2.httpServer.listen(httpPort);
        C.httpserver.on("error", errorHandler), ("listening", listeningHandler)에 대한 처리를 해준다.

    7.server.ts (express app을 클래스로 생성할 수 있도록하고 export하는 모듈)
        A.body-parser, cookie-parser, express ,morgan, path, errorhandler, method-override, (routes/appRoutes 에서 생성, 가공하는 클래스화)express.Router모듈 불러옴
        B.Server클래스을 export한다.
        C.Server클래스의 구성
            1.public static bootstrap():Server
                - 해당 클래스의 인스턴스를 생성해서 return.
            2.constructor(){
                this.app = express();
                    -new Server()이 아닌 Server.bootstrap()을 통해 생성하도록 함.(싱글턴객체 아님);
                this.config();
                    - express 앱에 대한 미들웨어 처리
                this.routes();
                    - express 앱의 express.Router 모듈 내장.
            }
            2.private config(), private routes()
                - 외부에서 접근 할 수 없도록 하여, bootstrap().app을 통하면 다시 this(Server클래스).app만을 리턴하도록 하여, class는 더이상 유효하지 않다. 
