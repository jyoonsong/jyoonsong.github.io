---
layout: post
title:  "자바 기초 예제 문제 풀이"
subtitle: "초심으로 돌아가 자바(Java) 왕기초 예제 복습/정리하기"
date:   2017-10-24 03:15:30
author: jaeyoon
categories: ["공부", "개발"]
tags:
  - "오픈소스"
  - "커뮤니티"
  - "OSS"
  - "Github"
  - "Dribbble"
  - "Codepen"
---

**초심으로 돌아가 Java 왕기초 예제 복습/정리하기**




- **최대/최소값** - 습관적으로 *0으로 초기화하지 않을 것.*

  ```java
  import java.util.Scanner;

  public class Max {
    public static void main(String[] args) {
      Scanner kb = new Scanner(System.in);
      int n = kb.nextInt();
      int [] data = new int [n];
      for (int i=0; i < n; i++) {
        data[i] = kb.nextInt();
      }
      kb.close();
   	int max = data[0]; // 0으로 초기화하면 음수 최대값 못 구하는 논리적 결함 생긴다. 밑 i는 0 아닌 1부터 시작해도 됨.
    	for (int i=0; i < n; i++) {
        if (data[i] > max) {
        	max = data[i];
        }
    	}
    }
  }
  ```


- **Shift** (한 칸씩 오른쪽으로 이동) - 역순으로 생각하라.

- **소수** - 2, 3, …, *sqrt(n) 까지 체크* 해보면 됨.

  약수가 n/2보다 클 순 없다.

  약수란 쌍으로 존재하는 것. 루트n보다 큰 게 있더라도 그 짝꿍은 루트n보다 작을 것. (둘다 루트n보다 클 순 없음.)

  ```java

  public class Prime {
  	public static void main(String[] args) {
  		int n;
  		for (n=2; n < 100000; n++) {
  			boolean isPrime = true; // 무죄추정의원칙처럼
  			for (int i=2; i*i <= n && isPrime; i++) {
  				if (n%i == 0 ) {
  					isPrime = false;
  					//break; //더이상돌필요없음
  				}
  			}
  			if (isPrime)
  				System.out.println(n);
  		}
  	}
  }
  ```

-  **쌍을 검사** - *반복문 안에 반복문*

    ```java
    for (int i=0; i<n; i++) { // [0,n)
      for (int j=i; j<n; j++) { // [i,n)
        // (0,0) (0,1) (0,2) ... (n-2, n-1) (n-1, n-1)
      }
    }
    for (int i=0; i<n; i++) { // [0,n]
      for (int j=0; j<=i; j++) { // [0,i]
        // (0,0) (1,0) (1,1) ... (n-1, n-2) (n-1, n-1)
      }
    }
    ```

- **구간의 합** - 0개 이상의 연속된 정수들을 더하여 얻을 수 있는 최대값. *구간시작점 루프와 구간 끝점 루프 - 반복문 안에 반복문*

  ```java
  import java.util.Scanner;

  public class Sequence {

  	public static void main(String[] args) {
  		Scanner kb = new Scanner(System.in);
  		int n = kb.nextInt();
  		int [] data = new int [n];
  		for (int i=0; i < n; i++) {
  			data[i] = kb.nextInt();
  		}
  		kb.close();
  		
  		int maxSum = 0; //0개이상이므로
  		for (int i=0; i < n; i++) { //구간시작점
            int sum = 0;
  			for (int j=i; j<n; j++) { //구간끝점
                sum += data[j];
                if (maxSum < sum)
                  maxSum = sum;
  			}
  		}
  		System.out.println(maxSum);
  	}

  }
  ```

- **응용** - n개의 음이 아닌 한 자리 정수를 입력받아 배열에 저장한다. 이들 중에서 1개 이상의 연속된 정수들을 붙여(digit으로) 얻을 수 있는 소수들 중에서 최대값을 구하여 출력하는 프로그램을 구현하라

  문제점 => n이 커지면 overflow(int는 2의 31승 정도가 한계) 발생 가능

  ```java
  import java.util.Scanner;

  public class Complex {
  	public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int [] data = new int [n];
        for (int i=0; i < n; i++) {
          data[i] = kb.nextInt();
        }
        kb.close();

        int maxPrime = 0; // 음이 아닌 정수이므로 
        for (int i=0; i < n; i++) { // 구간의 시작점 
          for (int j=i; j < n; j++) { // 구간의 끝점 

            // convert digit data into an integer
            int val = 0;
            for (int k=i; k<=j; k++) // 하나의 정수로 환산 
              val = val*10 + data[k];

            // test if it is a prime
            boolean isPrime = true;
            for (int p=2; p*p <= val; p++) {
              if (val%p == 0) {
                isPrime = false;
                break;
              }
            }

            // if yes, compare to the max
            if (isPrime && val > 1 && val > maxPrime)
              maxPrime = val;
          }
        }
        if (maxPrime > 0)
        	System.out.println(maxPrime);
        else
          System.out.println("No Prime");
    }
  }
  ```

- **스왑(Swap)** - 자리를 바꿀 때에는 *tmp 만들기*

  ```java
  int tmp = data[j];
  data[j] = data[j+1];
  data[j+1] = tmp;
  ```

- **정렬(Sort)** - 데이터를 크기 순으로 재배치. 오름차순(작=>큰)/내림차순(큰=>작) 어떤 순간에 컴퓨터가 실제로 하고 있는 일을 조사해보면 정렬을 하고 있을 확률이 가장 높다. 많은 정렬 알고리즘 존재.

  **버블정렬(BubbleSort)**

  가장 단순한 형태의 정렬 알고리즘 중 하나. n개의 수 중 *제일 큰 값을 찾아 어떻게든 맨 마지막 자리로* 가져옴. 그러고나면 이 값은 잊어버리고 데이터가 n-1개였던 것으로 생각하고 다시 이 과정을 반복한다. 가장 큰 값의 입장만 생각했을 때 맨 마지막으로 갈 수밖에 없도록.

  ```java
  for (int i=n-1; i>0; i--) {
    for (int j=0; j<i; j++) {
      if (data[j] > data[j+1]) { // 더 큰 걸 뒤로 이동
        int tmp = data[j];
        data[j] = data[j+1];
        data[j+1] = tmp; 
      }
    }
    for (int i=0; i<n; i++)
   	 System.out.println(data[i]);
  }
  ```

  **끼워넣기(Insert)** 

  이미 정렬된 배열(ordered list)에 x를 끼워넣을 때, 어디에 끼워넣을지를 찾는 방법은 크게 두 가지이다.
  앞에서부터 하나씩 비교하여 x보다 크거나 같은 수를 찾거나,
  뒤에서부터 하나씩 비교하여 x보다 작거나 같은 수를 찾는 방법이다.
  대칭적이라 유사하다고 볼 수 있지만, 결국 x를 끼워넣고나서 x보다 큰 값들을 한 칸씩 오른쪽으로 이동해야 한다는 것을 고려했을 때, 전자는 x 앞뒤의 모든 수를 건드리는 데 비하여, 후자는 x 뒤의 수만 조사/이동시킨다는 장점이 있다. 따라서 *뒤에서부터* 검사를 수행한다.

  ```java
  for (int i=0; i<n; i++) {
    int tmp = kb.nextInt();
    int j;
    for (j= i-1; j>=0 && data[j]>tmp; j--) {
      // 새 수보다 크면 한 칸씩 뒤로 이동한다.
      data[j+1] = data[j];
    }
    // j는 유지된다.
    data[j+1] = tmp;
  }
  ```

  ​

**Ref**

인프런 권오흠 강사님 https://www.inflearn.com