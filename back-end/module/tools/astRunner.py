import ast
from pprint import pprint
import os
import sys


def main():
    with open("./src/Main.py", encoding='UTF8') as source:
        tree = ast.parse(source.read())

    #pprint(ast.dump(tree) + "\n")
    analyzer = Analyzer()
    analyzer.visit(tree)
    analyzer.report()


class Analyzer(ast.NodeVisitor):
    def __init__(self):
        #내장함수
        self.innerFuncs = ["abs","all","any","chr","dir","divmod","zip","type","tuple","sum","str","sorted","round",
                            "range","pow","ord","open","oct","min","mas","map","list","len","isinstance","int","input",
                            "id","hex","filter","eval","enumerate"]

        self.stats = {"input": 0, "Return": 0, "Logical": 0, "Compare": 0, "Function": 0, "While": 0, "For": 0,
                        "If": 0, "ElseIf": 0, "Elif": 0, "tuple": 0, "UniqIf": 0, "SelfOp" : 0, "FuncNoArgs" : 0,
                        "list": 0, "num": 0, "AugAssign": 0, "Assign": 0, "BinOp": 0, "Expr": 0, "Name": [], "Str": 0, 
                        "Constant": 0, "FunctionUse": [], "FunctionDef": [], "UnusedFunc": 0, "ParamOverThree" : 0,
                        "CountPrint": [], "PrintRepeat" : 0, "UsedInnerFunc" : []}

    
    def visit_Assign(self, node):
        "할당정의 카운터 ex) a=5"
        self.stats["Assign"] += 1
        if isinstance(node.value, ast.Constant):
            if isinstance(node.value.value, str):
                self.stats["Str"] += 1
            if isinstance(node.value.value, int):
                self.stats["num"] += 1

        #자기자신에 대한 사칙연산
        if len(node.targets) == 1 and isinstance(node.targets[0], ast.Name) :
            if isinstance(node.value, ast.BinOp):
                if isinstance(node.value.left, ast.Name) and (node.targets[0].id is node.value.left.id):
                    self.stats["SelfOp"] += 1
                if isinstance(node.value.right, ast.Name) and (node.targets[0].id is node.value.right.id):
                    self.stats["SelfOp"] += 1
        self.generic_visit(node)

    def visit_Constant(self, node):
        "constant 카운터"
        self.stats["Constant"] += 1
        self.generic_visit(node)

    def visit_Tuple(self, node):
        "튜플 카운터"
        self.stats["tuple"] += 1
        self.generic_visit(node)
    
    def visit_List(self, node):
        "리스트 카운터"
        self.stats["list"] += 1
        self.generic_visit(node)

    def visit_BinOp(self, node):
        "연산자 카운터 ex) a=3*6"
        self.stats["BinOp"] += 1
        self.generic_visit(node)

    def visit_Attribute(self, node):
        "Attribute 카운터"

    def visit_Call(self, node):
        "호출 카운터"
        length = 0
        name = ''
        if isinstance(node.func, ast.Name):
            length = len(node.args)
            name = str(length)+node.func.id
            if node.func.id in self.innerFuncs and node.func.id not in self.stats["UsedInnerFunc"]:
                self.stats["UsedInnerFunc"].append(node.func.id)
        if isinstance(node.func, ast.Attribute):
            length = len(node.args) + 1
            name = str(length)+node.func.attr
            if node.func.attr in self.innerFuncs :
                self.stats["UsedInnerFunc"] += 1
        if name in self.stats["FunctionUse"]:
            pass
        else:
            if name in self.stats["FunctionDef"]:
                self.stats["FunctionUse"].append(name)
       
        
        self.generic_visit(node)
        

    def visit_Expr(self, node):
        "표현식에 대한 방문 정의 ex)3*7+5"
        self.stats["Expr"] += 1
        self.generic_visit(node)

    def visit_Name(self, node):
        #print(node.ctx)
        "변수에 값을 할당하기 위한 정의. ex) a=5값 5를 보유하는 변수 a를 말함"
        if isinstance(node.ctx, ast.Store):
            if node.id in self.stats["Name"]:
                pass
            else:
                self.stats["Name"].append(node.id)
 
    def visit_AugAssign(self, node):
        "단항연산자 카운터"
        self.stats["AugAssign"] += 1
        self.generic_visit(node)

    def visit_If(self, node):
        "조건문 카운터"
        for element in node.body:
            if isinstance(element, ast.If):
                if len(element.orelse) != 0 :
                    self.stats["UniqIf"] += 1
        if len(node.orelse) == 0:
            self.stats["If"] += 1
            self.generic_visit(node)
        else:
            if isinstance(node.orelse[0],ast.If):
                self.stats["Elif"] += 1
            else:
                self.stats["ElseIf"] += 1
                self.generic_visit(node)
        
    def visit_For(self, node):
        "for 카운터"
        self.stats["For"] += 1
        self.generic_visit(node)

    def visit_While(self, node):
        "while 카운터"
        self.stats["While"] += 1
        self.generic_visit(node)

    def visit_FunctionDef(self, node):
        "함수정의 카운터"
        self.stats["Function"] += 1
        length = len(node.args.args)
        if length == 0 :
            self.stats["FuncNoArgs"] += 1
        if length > 2 :
            self.stats["ParamOverThree"] += 1
        name = str(length)+node.name
        self.stats["FunctionDef"].append(name)
        self.generic_visit(node)

    def visit_BoolOp(self, node):
        "논리연산자 카운터"
        self.stats["Logical"] += 1
        self.generic_visit(node)

    def visit_Compare(self, node):
        "비교연산자 카운터"
        self.stats["Compare"] += 1
        self.generic_visit(node)

    def visit_Return(self, node):
        "리턴 카운터"
        self.stats["Return"] += 1
        self.generic_visit(node)

    def visit_Not(self, node):
        "논리연산자 카운터"
        self.stats["Logical"] += 1
        self.generic_visit(node)

    def report(self):
        self.stats["UnusedFunc"] = (len(self.stats["FunctionDef"])-len(self.stats["FunctionUse"]))
        pprint(self.stats)


if __name__ == "__main__":
    main()
