### AST 공부

```python
Module(
    body=[
        FunctionDef(
            name='example', 
            args=arguments(
                posonlyargs=[], 
                args=[
                    arg(
                        arg='self',
                        annotation=None,
                        type_comment=None
                    )
                ], 
                vararg=None,
                kwonlyargs=[], 
                kw_defaults=[],
                kwarg=None,
                defaults=[]
            ),
            body=[
                Assign(
                    targets=[
                        Tuple(
                            elts=[
                                Name(id='a', ctx=Store()),
                                Name(id='c', ctx=Store())
                            ], 
                            ctx=Store()
                        )
                    ],
                    value=Constant(value=5, kind=None), type_comment=None), 
                Assign(
                    targets=[
                        Name(id='c', ctx=Store())
                    ],
                    value=Constant(value=6, kind=None),
                    type_comment=None),
                Assign(
                    targets=[
                        Name(id='d', ctx=Store())
                    ],
                    value=List(
                        elts=[
                            Constant(value=1, kind=None),
                            Constant(value=2, kind=None),
                            Constant(value=3, kind=None)
                        ],
                        ctx=Load()
                    ),
                    type_comment=None
                ), 
                Expr(
                    value=Call(
                        func=Name(id='print', ctx=Load()), 
                        args=[
                            Name(id='c', ctx=Load())
                        ], 
                        keywords=[]
                    )
                )
            ], 
            decorator_list=[], 
            returns=None, 
            type_comment=None
        )
    ], type_ignores=[])
```

``` python
Module(
    body=[
        Assign(
            targets=[
                Tuple(
                    elts=[
                        Name(id='a', ctx=Store()),
                        Name(id='c', ctx=Store())
                    ],
                    ctx=Store()
                )
            ], 
            value=Constant(value=5, kind=None), 
            type_comment=None
        ), 
        Assign(
            targets=[
                Name(id='c', ctx=Store())
            ], 
            value=Constant(value=6, kind=None), 
            type_comment=None
        ), 
        Assign(
            targets=[
                Name(id='d', ctx=Store())
            ], 
            value=List(
                elts=[
                    Constant(value=1, kind=None), 
                    Constant(value=2, kind=None), 
                    Constant(value=3, kind=None)
                ], 
                ctx=Load()
            ), 
            type_comment=None),
        Expr(
            value=Call(
                func=Name(id='print', ctx=Load()), 
                args=[Name(id='c', ctx=Load())], 
                keywords=[]
            )
        )
    ], type_ignores=[])
```

```python
Module(
    body=[
        Assign(
            targets=[
                Name(
                    id='a',
                    ctx=Store()
                )
            ], 
            value=Str(s='강영우 최고')
        ), 
        Assign(
            targets=[
                Name(
                    id='a',
                    ctx=Store()
                )
            ],
            value=List(
                elts=[Num(n=1), Num(n=2), Num(n=3), Num(n=4)],
                ctx=Load()
            )
        ),
        Assign(
            targets=[
                Name(id='b', ctx=Store())
            ], 
            value=Str(s='강영우')
        )
    ]
)
```

1. 변수 개수
   - 선언되는 변수명(name)을 리스트에 채워넣고  중복된 변수명이 있을 경우 카운트 안함
     => 중복 변수 예외 처리
   - 중복되는 변수명이 있을 경우 최신 변경사항을 적용
   - 숫자형, 문자형, 리스트형, 튜플형, input형 각각 계산
   - 활용된 변수와 활용되지 않은 변수 체크 ?
2. 연산자 개수
   - 사칙, 단항, 비교, 논리연산 각각 카운트
   - `a = a + 1`을 인식, `a += 1`로 제안
3. 조건문 개수
   - if문, if else문, if elif else문 각각 횟수 파악
   - if else문이 다중 사용될 경우를 인식
4. 반복 갯수
   - while, for 개수 확인 (반복문이라고 한번에 체크)
   - 반복문을 사용하지 않고 똑같은 문장을 똑같이 print한 경우를 체크
   - while문을 빠져나가지 못하는 경우 체크
   - while문을 사용한 경우 따로 체크
   - for문을 사용한 경우 따로 체크
   - 두개 모두 사용한 경우
5. 함수
   - 함수 정의된 횟수 파악
   - 함수 안에서 return 함수가 없는 경우 체크
   - 내장함수 abs, all, any ... 등 활용된 함수 체크
   - 매개변수가 없는경우 체크?