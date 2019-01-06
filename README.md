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