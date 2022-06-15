/*
 * @Date: 2022-06-14 12:08:37
 * @LastEditors: XPy
 * @LastEditTime: 2022-06-15 09:49:22
 * @FilePath: \knowledge\src\utils\request.js
 */
export function request(params){
  const { url='', method='post', } = params;
  return fetch(url,{ method, }).then(res=> res.json())
}

// https://huayue.elascloud.com/c/userManage/getUserList
// baseApplicationId: 74
// baseOrgId: 1

// Cookie: token=eyJiYXNlQ3BJZCI6MjM1LCJiYXNlRGF0YVVybCI6ImpkYmM6bXlzcWw6Ly9ybS1icDE1azJ5ZDc1bTRxZDVpeTJvLm15c3FsLnJkcy5hbGl5dW5jcy5jb206MzMwNi9uYmh5X2xpbmU_c2VydmVyVGltZXpvbmU9QXNpYS9TaGFuZ2hhaSZ1c2VPbGRBbGlhc01ldGFkYXRhQmVoYXZpb3I9dHJ1ZSZ6ZXJvRGF0ZVRpbWVCZWhhdmlvcj1jb252ZXJ0VG9OdWxsIiwiYmFzZURhdGFOYW1lIjoibmJoeV9saW5lIiwiYmFzZURhdGFVc2VyTmFtZSI6Im5iaHlfbGluZV85OWtlbzd5dCIsImJhc2VEYXRhUGFzc3dvcmQiOiIxaXpqcnFlODcxIiwiZmxhZyI6MSwiYWxnIjoiSFM1MTIifQ.eyJleHAiOjE2NTU4NjEzMTUsImp0aSI6IjIifQ._p3-Zt10tursFmYJPm_emhthAx8hNClOH1Z7vnCFO0omyssCJhfN8pIxp_xubMEEwh3crvcpm2LI77Ff5mqVKA; sid=s%3Afbdd1c61-8751-435e-aff8-bffe30696039.GZs%2FzCp8RY3ZRgTveMujQb5qkUC21sX%2B4gpzlQjQ5K4