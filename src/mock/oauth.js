/* eslint-disable max-len */
import Mock from 'mockjs'

export default ({ mock }) => {
  if (!mock) return
  Mock.mock('/api/blade-auth/oauth/captcha', 'get', () => {
    return {
      response: {
        key: '3aff0480-c0a8-404c-ad0b-48a0f4c6f266',
        image:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAAAwCAIAAABSYzXUAAAO70lEQVR42u1aC1CTVxrNjlZrXWudcZyu03Xczjptp+26XVprHeu61j5cl7Za3VrHcV3XIkh5CCqioIhVUVEXgUUkQR4K8hIhomAERAQRQmIEAgHCI7xfQniIgIE96YeXf0NIYsdZ2t3cuZP5783NH3LO/c75vvvDGzK3n0DjmSEw02BuZhrMNDzD1iWV3re0FFtYSD74oMLVdaC93UzDODRw0BIfr+nrAwG1vr6FX31lpmEcGuIAHLBh/oIFZhrGoUk+/LC/tZWu21JSFFZWZhrGoVV6eECLiAPp0qWdYrGZhnFosAT4AbQIcaC+e/e/8I1lZUOurkOIOlvboaCgoa4uMw3j0cBBZuZQf7+WgEuXhvbtM9MwHg1xAA5Ys7Y20zAezc5uSK0evs7NHfL2/n+lYVVA+QTr/Gn20nluBZZ+ZeuCKjyv1Bc39D7Dr9AMaFSFKkW2IiMsI9kv+ZzDOYGt4Orpq+oWdUiIVouIA0fHIYVC/x36+gcCYjOW25ya9qH9c+/bvLbaPVum/DE01Da1B8bdWr+X/+ZajymLbHEvvM61dF3nGhQtGreERKrq4VmJR/epdpJGdf+Pu+fg4GBDeUNZblnmhcyUgJRg++BAq8Cz1mcvul0UBYryEvMSjiVghr+NH+YcVqdshx9AixAHcrn+G6bllQAonoXV/G88T5wX5RRU0PXT0XAzX7HUyps+6RWSfC2rENwSwwkZ95ZZn8RbFhsO1bd0mPIj+x91he94OdCKF2TzHH/bZIHd1Itu8yokcRwUNFiDrtEMGL3blrAqgK560CeSq9GFso5PfUqJiX2JdSPbedAkAiokFdEe0UAcKIfvCgcH2dHZ5XnlzZXN4IYtK8kqwQJEA16vnLpi+J7BCVnAZ+ZHThHJuSNAW1hNeM/6KWiwOhSOz6zaEQAOx/rYvjOJWPP21wcGHmuM/tTyvIvgIOHYYi06mgFFdgiGAtspD+qLaEFG2BbMUAdVYc6zrp5ecTfORY9WDA5Bi2bvknEnLQ7JiYaZTvcI/XhpO1Rrruv9tYFKD2E9hs2d+gkuTCsEslmRWVAhAz+hra4Ny5J8kiBNiBUDKwE9kJn92S5lbQuLjD3+8ZiEnJhKw/eCJHxgp0+sUXBX2J3GSp/IVKMrMy/YAF+x0GNYVa4ePucwHTNR+9+gmSj31zCslYseqhtVhdfiDr6D4VnrCYgPnVslFXQAboA7ksU3PWK69JxN/sAPPFiFayNm+alS2MaS4yWTt+Vj+IrL/YFRMYJdD3yh/nr/8paqFgQHFCnIJgjLqEOaxvqlxZUNpN5ShUq7G9Kl81a5YQbxIborxwUmG3r6w0vbKjv7DNFAWgQyu3oe0UxY0p3F/zg2+YNtUxfbfeHkr2p8QPMpd4qwEm8ZpeGa70rAWleSRsMbQevCd82GNGHjkyIBcSzQDAz/ZQgFioyqewk6t3KIUgFQGDKbcYmrZTSs9C2jyVf3FGBYVD9s2rYR1bQALOrREPtgoNzbqV3cUNpQU1TD3oITMPRNoYHQ8wgU4hpbmYTI7njUa18fnLDA5iVLt5fDZbxAMfp+cZ0hGl7+ZAc+jO7gHQUbeGPNfhqiY4jXRX8/yjIBDIlhww36A8QBNw3jvRaChgjXuYiJH+K9AIgH208biWvXueiYzLvspnOr+Z5FQBN+wGaQLDEa/NObMaNo7MX1G/sL2ZqNwZW0gMsfa6n8VICL11jPWAI6/0r+sEeG3gx1CmVkgDAkTm01bXp/JvkwLKG3r3/zsSgC7fnlO6ccSOCdySP00X8ZLFl+pTSouMUQDXGpEoa7TkdAgFsmcBrNoGG9o9bRqACgl48uGmHFbiqIubB7TqznfHBDzoEIYAtg4+nBGzGZErCKe6uePg2h2fVomFFlyyNuskQ566kbTbjeE1/LPrjgcDEtgEbp0f2aNkqNWIdjd7V2kYFjGLknEq/yW3KuaeuecKgffeYqACC/duS/5JUyDNpCW97JDED/VkzRGpHSt7Aps6FrQF/yoMeitxwMY9DP+tgZIdb8oBPJK80s+fY4LRPeklG+ZIo/3wofOfhM9rMMcZyB7Y8QIU/GK1z6ScLehyHZeKjTTO6tEASA8k2PIjZzPqeNcQBDpklKnHIquocPnTSDsGtagyJDvwPXtCFfIsTjveJxgSRVG/G9fYyboowiHdxjlA8O5tevu1ExM/SedqcvdtBC5CXirTlCWP1hh+CaSt3Sazz900MDYgopEIoDOIzmCXW5RZUUEAXldVyL9o1KM8WfleLosXJZeHJZzvlWlZRmMCSfoGyKuxiSAig3CEZ29KaQSkbD5tAqAh1GPcv5HluDNImt0RsNrMEYNBpEZzlAh0DRZMyBGKIh0T8ZmB6RNozgzukzTqYDjemf7IxXtk5834ZoQI70LKtokPHpdz5QJNgDSwnwNa9+vsdowir0XgpA1S1KE/+gwjRfiBL8HJ+CanHfAoiAMiCjmc0s9CpmEMdJtI8/I3LbGCXcOoP68ZRGo38Ai4Dy1m7s9xP/TKGh39YgLu5gYqlQ8d1tVUBRc013H+pcALLJIwR7l2mJ7dEIZErQbap8kfisdQnUWwYYpwHBsdLBFxU5UiM2iRl8Dao8ox+neo0T/rLqgiRseQDd01E/ul4TBa4F+jdDN4OG9JBNo+sDrj9PsZUwiKtatYnWF/7lOmsoa6IuruoZ82c+1txp6kYqiRzGa1cEcP/d0VTA/c5REdOlFedyt2RUQeKlrbr3Wb+XD0CiRWKkNowGJDgXU/KwU7GPsXFdTsfRPAz46WhAerpg4+HXVrvjLmySmEcFZ5QDFGg6TkvlNLfDJLgL4AcYUmEBseLebaqdhPkwNSb66JDP2vZ+zLAiDg3csAVzdt/XEXeIDMT9y5Tydy/Jn+dL2E5f7a49uvjyUBL2+67MSkZD6Z3SsX7p/G88gUmZqgllL2Ht9q/LmlFuvP1ENN7CnobXmkpDVX0r8ld48gP1CPn+0VoRRKVtisLAEoDmnRhnGjZV5DBP5nbhyWUsVjCMO2RB8+qm/3BUiD7Q7BsY+W2oyBjKGCI70slKSaOofykoh7ID9N/HyicG5euIO/pvIwug+8dljXHXsXsCRWdv0E1YIpsekj7WL4XmABbKXJC2MPXWadkyJZEEPkyiAdkRpH+Z9UmIElOnDe4CfB//8m0ThR6JP9BEskTDglQfDIsyAqheY52JD4yB0YC40bkb0cCdcY6pYSgjNUK1jNy07eFjiEZ8ZTtA/82hEUXi+YwgDhrmRtz/y7Uyt7y6c4rW4vZebh7Z0djBdWlUD0SDgdMkGCfRQK2+pWOPf/w76w9CM2DUiAzYBiap2EKfa+lqnAZ1dy/KNPSe3j522oq4gzoVKetNP7m8fuYrOqXgDikmkLbiAnGA65KsYGYMGMJO8JrKX69zN6gKl4aufk1WfdcSn5KJNuKJNvkv7pTOOip7/uyItvACxLytwxxMds4H6Lvv1kL94QG9TzILlAL1inqdggBaDtAFtoJh+copIxrOOZwzHA2UsMAyp//RgYoq1NKADqCxEweiQafe0kMDoF+4yQv3BRlc7SPCdTpuh68cS6OQcQJQOhpCpYYh7LdCEsdSWCrTYNrDxeMTOdKeQd3kV3b25TX3iGrVwA5a8foRbQn9XkQxqiG9qkId2xyaDi/9VFDKQsE3rWn0n4dS4LzLeeAbfzgeEcB9i3toAZ6MHmNAOYAGPVFAdoTrV1a4iOVVzGKR6wMrqnkp9TdCg/OpGMOnstzmF5eJxQs2HwNk1GF96XWd1INdtGcSAre3+EH2/AhPXPv5f3vCd0uA7Qv786qtM6u9976LyVUJeQAOPcB6EqNhhl+SLsQHf8B07/DwlfP3FyeUYI/vuFOD7EVY3QFtYdu8vqN/mr2UVXZcR6EmE8logxPE2PsFqQXDFV/fAGai3KNo+Lj/Ma0JsgkaCweUWcAhIDZDm0ostsP17Xvl3Gxz5kdO2MpShYpowNAQDcBu0iI7WvrnaAmhg/56VCF2GXVuUsHb6KNd/P01vRvzr+7f6Ljxave/OTtZbNzzOS3w2zrZf+skup7ul4wFPjYv4PWI3WygDM8E0GtESmxtiLiXuOFFRwn0525dDxTJUKEzOLTUW8FCIa2kU2dBU0UTAf1Q/TDFP4XlQlD/7vZuSZIE12W5ZdzgQEfojPWNIcJsJjuHg69SNo+9LyutOXXhBjJXZEeYoRNv9C+c/A3RgKxZW5Qv1Codb3fMWIE/4nXrjv3iPWvGEHVgR+StOn/5zNb/cGO/7b86Yz3xsPASvgiFT6DNpEC7FyNivISpEdHBtlhwM9GLe7ah+1SrpBNGjYrMcIxSoUedf7tl9AIQAFirC6ppWC2rFnoLz1qfRQ9xDLl+5rqqUMV9Nkc0pAnGPDKAK0CFANq1LO2RIrKYN9d6QK4hUEAcRg1dQjpLFoL+vSDJSDRY2A9nvqsPRTJ5Qbwz2enlVM5IpQzLV29nMxIk1NIsO7qwew5790bQOp1woVPx0UfcrKUUqWc4SpGV6n2+htKBxQEIC7vTqvcm6cHpgFWaLDVFeOW35ERDq6rV6AOfGX9yZJbAbY1taiQ4BCwQQzFgxBvozG708Sq+wHK7H5wDSTHLYhFr6KadiAxUy4T5VzyLb/N1Dv64HVUFUlV2Kq7/IXl7/6qAciRO+xLrqDCG9IvkartIFaurlxwvYc8bRjdoEXZ9sH1w1wPj/+11+ehlcJATm2N0JdXS2mcMxyKRp9KTY1Rd8IxZHzszMEdXvjy9J0gwkLGOu0d3HZl7un+A0AwgVtIEG66cWo5yGhFz0W0ee0BkuKGcBg3LTipgxSie0VFmo26wCq/KVnYb/XhDaQNoIHsYa01LVUvi8UQ4s4lxg91JJ56UQ+rNLWHmpp4pMScx2t/++gB76Pqza211bajRQp1CZSkyODPZACaVYmXmhcyYAzHIo7Iis9Qt6qfZWIMup+NAwJyVu+EQ8IzWjm4ybUzi4n/n/5Sebau6V0X/FAN/RtqKdAjD3PjcWnmtgec8RiK1sgG6BDOg41Vs1u0nog3sVzMNP4lmpsFMg7mZaTDTYG5mGsw0mJuZBjMN5mam4WfR/g3ijhliVcOSZQAAAABJRU5ErkJggg=='
      }
    }
  })
  Mock.mock(new RegExp('/api/blade-auth/oauth/token' + '.*'), 'post', () => {
    return {
      resCode: 200,
      response: {
        access_token:
          'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzYWJlciIsImV4cCI6MTU4NzAyNTQzMiwibmJmIjoxNTg3MDIxODMyfQ.kzX2qHdtmg4DeC__mYDULvMy--gpKkloWIJ--bi4NVk',
        account: 'admin',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        expires_in: 3600,
        license: 'powered by bladex',
        nick_name: '管理员',
        refresh_token:
          'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInRva2VuX3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1ODc2MjY2MzIsIm5iZiI6MTU4NzAyMTgzMn0.mx_Q8bfaYB82gIIbGidpfTYjAzPZ-rWkxYSQKHlV4h8',
        role_name: 'administrator',
        tenant_id: '000000',
        token_type: 'bearer',
        user_name: 'admin'
      }
    }
  })
  Mock.mock('/api/blade-auth/oauth/token/refresh', 'post', () => {
    return {
      response: {
        account: 'admin',
        user_name: 'admin',
        nick_name: '管理员',
        role_name: 'administrator',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        access_token:
          'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoi566h55CG5ZGYIiwiYWNjb3VudCI6ImFkbWluIiwidGVuYW50X2NvZGUiOiIwMDAwMDAiLCJjbGllbnRfaWQiOiJzd29yZCIsImV4cCI6MTU1Nzk0Njc5OSwibmJmIjoxNTU3ODgxODg0fQ.FT8y1v1tg8hOAAoQpKlarKMgmsSXol-561edqtvOwa4',
        refresh_token:
          'eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoi566h55CG5ZGYIiwiYWNjb3VudCI6ImFkbWluIiwidGVuYW50X2NvZGUiOiIwMDAwMDAiLCJjbGllbnRfaWQiOiJzd29yZCIsImV4cCI6MTU1Nzk0Njc5OSwibmJmIjoxNTU3ODgxODg0fQ.FT8y1v1tg8hOAAoQpKlarKMgmsSXol-561edqtvOwa4',
        token_type: 'bearer',
        expires_in: 64915,
        license: 'powered by bladex'
      }
    }
  })
}
