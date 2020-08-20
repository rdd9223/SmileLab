import ast
from pprint import pprint
import os
import sys
import json
import astdump


def main():
    with open(sys.argv[1], encoding='UTF8') as source:
        tree = ast.parse(source.read())

    #pprint(ast.dump(tree) + "\n")
    #astdump.indented(tree)
    analyzer = Analyzer()
    analyzer.visit(tree)
    analyzer.report()


class Analyzer(ast.NodeVisitor):
    def __init__(self):
        #내장함수
        self.innerFuncs = [
            "abs","all","any","chr","dir",
            "divmod","zip","type","tuple","sum",
            "str","sorted","round","range","pow",
            "ord","open","oct","min","mas",
            "map","list","len","isinstance","int",
            "input","id","hex","filter","eval",
            "enumerate","input","tuple","print"
        ]

        self.stats = {
            "input": 0, "Return": 0, "Logical": 0, 
            "Compare": 0, "Function": 0, "While": 0, 
            "For": 0, "FunctionUseCount": 0, "If": 0, 
            "ElseIf": 0, "Elif": 0, "tuple": 0, 
            "UniqIf": 0, "SelfOp" : 0, "FuncNoArgs" : 0,
            "list": 0, "num": 0, "AugAssign": 0, 
            "Assign": 0, "BinOp": 0, "Expr": 0, 
            "Name": [], "Str": 0, "Constant": 0, 
            "FunctionUse": [], "FunctionDef": [], "UnusedFunc": 0, 
            "ParamOverThree" : 0, "CountPrint": [], "PrintRepeat" : 0, 
            "UsedInnerFunc" : [], "UsedName": [], "NameUsedAssign": [], 
            "NameUsedOp": []
        }

        self.elifFlag = 0
        self.elseFlag = 0
        self.IFStacks = []

    
    def visit_Assign(self, node):
        "할당정의 카운터 ex) a=5"
        self.stats["Assign"] += 1
        if isinstance(node.value, ast.Constant):
            if isinstance(node.value.value, str):
                self.stats["Str"] += 1
            if isinstance(node.value.value, int):
                self.stats["num"] += 1
        if isinstance(node.value, ast.Name):
            if node.value.id in self.stats["Name"] :
                if node.value.id not in self.stats["NameUsedAssign"]:
                    self.stats["NameUsedAssign"].append(node.value.id)
        if isinstance(node.value, ast.BinOp):
            if hasattr(node.value, "left") and isinstance(node.value.left, ast.Name):
                if node.value.left.id not in self.stats["NameUsedAssign"]:
                    self.stats["NameUsedAssign"].append(node.value.left.id)
            if hasattr(node.value,"right") and isinstance(node.value.right, ast.Name):
                if node.value.right.id not in self.stats["NameUsedAssign"]:
                    self.stats["NameUsedAssign"].append(node.value.right.id)

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
        #튜플카운터
        self.stats["tuple"] += 1
        self.generic_visit(node)
    
    def visit_List(self, node):
        "리스트 카운터"
        self.stats["list"] += 1
        self.generic_visit(node)

    def visit_BinOp(self, node):
        "연산자 카운터 ex) a=3*6"
        self.stats["BinOp"] += 1
        if hasattr(node, "left") and isinstance(node.left, ast.Name):
            if node.left.id not in self.stats["NameUsedOp"]:
                self.stats["NameUsedOp"].append(node.left.id)
        if hasattr(node,"right") and isinstance(node.right, ast.Name):
            if node.right.id not in self.stats["NameUsedOp"]:
                self.stats["NameUsedOp"].append(node.right.id)
        self.generic_visit(node)

    def visit_Attribute(self, node):
        "Attribute 카운터"

    def visit_Call(self, node):
        "호출 카운터"
        length = 0
        name = ''
        self.stats["FunctionUseCount"] += 1
        
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
        "변수에 값을 할당하기 위한 정의. ex) a=5값 5를 보유하는 변수 a를 말함"
        if isinstance(node.ctx, ast.Store):
            if node.id in self.stats["Name"]:
                pass
            else:
                self.stats["Name"].append(node.id)
        if isinstance(node.ctx, ast.Load):
            if node.id in self.stats["Name"]:
                if node.id not in self.stats["UsedName"]:
                    self.stats["UsedName"].append(node.id)
 
    def visit_AugAssign(self, node):
        "단항연산자 카운터"
        self.stats["AugAssign"] += 1
        if hasattr(node, "value") and isinstance(node.value, ast.Name):
            if node.value.id not in self.stats["NameUsedOp"]:
                self.stats["NameUsedOp"].append(node.value.id)
        self.generic_visit(node)

    def visit_If(self, node):
        "조건문 카운터"
        currentE = None
        pn = {"id" : id(node), "type" : type(node)}
        for e in self.IFStacks:
            if pn in e :
                currentE = e
        if currentE is None:
            new = [{"id" : id(node), "type" : type(node)}]
            self.IFStacks.append(new)
        if len(node.orelse) != 0:
            nn = {'id' : id(node.orelse[0]), 'type' : type(node.orelse[0])}
            if currentE is None:
                self.IFStacks[len(self.IFStacks)-1].append(nn)
            else:
                self.IFStacks[self.IFStacks.index(currentE)].append(nn)

        for element in node.body:
            if isinstance(element, ast.If):
                if len(element.orelse) != 0:
                    self.stats["UniqIf"] += 1
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
        if hasattr(node, "left") and isinstance(node.left, ast.Name):
            if node.left.id not in self.stats["NameUsedOp"]:
                self.stats["NameUsedOp"].append(node.left.id)
        if hasattr(node,"right") and isinstance(node.right, ast.Name):
            if node.right.id not in self.stats["NameUsedOp"]:
                self.stats["NameUsedOp"].append(node.right.id)
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
        for e in self.IFStacks:
            if len(e) is 1:
                self.stats["If"] += 1
            elif len(e) is 2:
                if "Expr" in e[len(e)-1]:
                    self.stats["ElseIf"] += 1
                else:
                    self.stats["Elif"] += 1
            elif len(e) > 2:
                self.stats["Elif"] += 1
        json_val = json.dumps(self.stats)

        #print(self.IFStacks)
        #print(len(self.IFStacks))
        print(json_val)
if __name__ == "__main__":
    main()
