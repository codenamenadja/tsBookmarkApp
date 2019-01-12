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
            
        8.server.ts에서 불러온 appRoutes 모듈과 공통기능의 baseRoutes모듈
            A. BaseRoute, controllers/index 모듈 외에 express { NextFunction, Request, Response, Router } 불러옴.
            B.해당 모듈은 AppRoutes 클래스를 export
            C.AppRoutes클래스 구성
                -BaseRoute를 extends함.
                    1.BaseRoute는 의존모듈이 없이, Response, Request만을 express에서 불러옴
                    2.protected title:string, private scripts: string[]
                    3.constructor(){this.title="typescript based server"}
                    4.public addscript(src:string):BaseRoute
                        -src를 받아 scripts(private)로 push함
                    5.public render(req,res,view,options)
                        -res에 대한 기본설정(res.locals)인 BASE_URL, scripts, title을 진행
                        -최종적으로 res.render(view,option)을 진행하는 메서드를 가지고 있다.
                    end: BaseRoute모듈은 res에 대한 공통되는 설정(헤더의 역할)과 공통되는 메서드인 render메서드에 대한 로직만 제공되는 라우팅기능의 부모 클래스이며, render(view)의 메서드만 보유할 뿐 페이로드는 존재하지 않는다.
                -contructor내에서 super()을 통한 상속
                -public static create(router:Router){
                    실제적인 주소에 대한 라우팅 정보를 담고 있다. 
                    router.route("/").get();
                        -컨트롤러의 index모듈에서 불러온 실제 페이로드를 포함해 최종 렌더링(appRoute ->
                        IndexRoute()의존 ->
                        IndexRouter.renderView() ->
                        let listArr = new ItemList().getList() 데이터 받아옴 ->
                        let listHTML:string = template.getItemTemplate(북마크데이터) ->
                        let options:Object = { title:title, listHTML: listHTML} 구성 ->
                        this.render(req,res,"index", options) ->
                        여기서 this.render은 BaseRoutes.render()을 향함)
                    router.route("/add").post();
                        (appRoute의 라우팅 논리회로 ->
                        IndexRoute().add를 통해 req.body에 있는 페이로드 첨가 ->
                        indexRoute().add내의 최종 res.send(response) ->
                        종료
                            :response에는 Iresponse.IresponseItem에 해당하는 
                            {
                            success:boolean,
                            item: item(req.body.item)
                            }
                            를 돌려보냄으로서 통신이 성공했는지 여부를 전달.
                        )
                }

        9.ejs엔진의 views설정
            A.8번에서 appRoute -> IndexRouter.renderView()는 
            this(BaseRoute).render(req,res,"index",options); 을 통해
            렌더링의 마무리를 지었다.
            여기서 "index"라고 함이 views내의 index.ejs를 의미.
            B.이 파일은 예시 파일을 일단 복사하도록 한다.
                -html의 dom구성과 data-binding만 잘 참고하자.
            
        10.client/ js, css, bootstrap 파일 추가
            A.html파일은 서버에 접속시 배포되는 ejs템플렛을 이용
            B.대응하는 jquery-logic index.ts로 설정
            C.css, bootstrap.min 추가
        
        11.grunt를 이용한 자동 컴파일 환경 구축(gruntfile.js)
            A.배포를 위한 단계별 작업
                1.Typescipt 컴파일
                2.정적자원(css,img,template) 배포 디렉터리로 복사
                3.번들링(웹팩 어플리케이션 컴파일 후 번들링후 dist에 저장)
                4.어플리케이션  실행(브라우저 콘솔, 서버CLI를 통한 디버깅)
        