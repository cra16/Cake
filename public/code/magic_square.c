#include <stdio.h>

int main(void)
{
    int size = 9;
	int i,j;
	int x,y;
	int magic_square[99][99];

    x = size / 2;
    y = 0;
    
    printf("This is a Magic Square program.\nSize is 9.\n");
    
    for ( i = 0; i < size; i++ ) {
        for ( j = 0; j < size; j++ ) {
            magic_square[x][y] = i*size + j + 1;

            x = (x+1) % size;
            y = (y+size-1) % size;
        }
        x = (x+size-1) % size;
        y = (y+2) % size;
    }

    for ( i = 0; i < size; i++ ) {
        for ( j = 0; j < size; j++ )
            printf("%-5d", magic_square[j][i]);
        printf("\n");
    }
	return 0;
}