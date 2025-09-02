def look_and_say(num):
    i = 0
    cadena = ["1"]
    if num <= 0:
        print("El número debe ser mayor a 0")
    else:
        while i < num-1:
            anterior = cadena[i][0]  #primer número de la cadena para comparar 
            contador = 1              
            proximo_numero = ''
            for term in cadena[i][1:]:  #corte slice, itera sobre la cadena sin el primer carácter
                if term == anterior:
                    contador += 1
                else:
                    proximo_numero += str(contador) + anterior
                    contador = 1
                anterior = term
            proximo_numero += str(contador) + anterior

            #print(proximo_numero)
            cadena.append(proximo_numero)
            i += 1  
        print(cadena)  

look_and_say(6)