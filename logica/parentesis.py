def balance_parentesis(cadena):
    contador=0
    for i in cadena:
        if i == "(":
            contador += 1
        else:
            contador -= 1
    
    if contador == 0:
        return True
    else:
        return False
    
if balance_parentesis("(())(())("):
    print("Parentesis Balanceados")
else:
    print("Parentesis No Balanceados")