# todo

REST API

1. Uniform interface 중요!
   1- 하나의 자료는 하나의 URL로
   2- URL 하나를 알면 둘을 알 수 있어야 함
   3- 요청과 응답은 정보가 충분해야함
2. Client - Server 역할구분
   1- 브라우저는 요청만
   2- 서버는 응답만
3. Stateless
   1- 요청1과 요청2는 의존성이 없어야함
4. Cacheable
   1- 서버에서 보내주는 정보들은 캐싱이 가능해야함
   2- 캐싱을 위한 버전 같은 것도 관리 잘해야함
5. Layered System
6. Code on Demand

좋은 REST API 이름 짓기 원칙 :
1- URL을 명사로 작성 추천
2- 하위문서는 /
3- 파일확장자 쓰지말기
4- 띄어쓰기는 - 사용
5- 자료 하나당 하나의 URL
