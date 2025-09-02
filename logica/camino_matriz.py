def camino_matriz(mat):
    """
    Devuelve True si existe un camino desde (0,0) hasta (n-1,m-1)
    moviéndose solo a la derecha o hacia abajo, evitando obstáculos (1).
    Versión detallada con condicionales explícitos.
    """
    n = len(mat)
    m = len(mat[0])
    new_mat = [[False for _ in range(n)] for _ in range(m)] #creo nueva matriz y la lleno de False


    if mat[0][0] == 1 or mat[n-1][m-1] == 1: #si la fila inicial el 1 o la final es 1 no hay caminos disponibles
        return False
    

    for i in range(n):
        for j in range(m):
            # Si hay obstáculo en la celda actual, no es alcanzable
            if mat[i][j] == 1:
                new_mat[i][j] = False
            else:
                # Si es la celda inicial (0,0) y no hay obstáculo, es alcanzable
                if i == 0 and j == 0:
                    new_mat[i][j] = True
                else:
                    # Caso: primera fila (solo puedo venir desde la izquierda)
                    if i == 0 and j > 0:
                        if new_mat[i][j - 1] == True:
                            new_mat[i][j] = True
                        else:
                            new_mat[i][j] = False

                    # Caso: primera columna (solo puedo venir desde arriba)
                    elif j == 0 and i > 0:
                        if new_mat[i - 1][j] == True:
                            new_mat[i][j] = True
                        else:
                            new_mat[i][j] = False

                    # Caso general: puedo venir desde arriba o desde la izquierda
                    else:
                        if new_mat[i - 1][j] == True:
                            new_mat[i][j] = True
                        elif new_mat[i][j - 1] == True:
                            new_mat[i][j] = True
                        else:
                            new_mat[i][j] = False

    return new_mat[n - 1][m - 1]


# Ejemplo de uso
matriz = [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0]
]
print(camino_matriz(matriz))  

if camino_matriz(matriz):
    print("existe un camino ")
else:
    print("No existe un camino")